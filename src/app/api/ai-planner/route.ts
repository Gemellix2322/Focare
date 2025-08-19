import { NextResponse } from "next/server";

type PlanTask = {
    title: string;
    due_date?: string;
    status?: "pending" | "completed";
};

type PlanResponse = {
    horizon_months: number;
    goal: string;
    tasks: PlanTask[];
    estimate_hours?: number;
};

export async function POST(req: Request) {
    try {
        const { goal, months = 6 } = await req.json();

        if (!goal || typeof goal !== "string") {
            return NextResponse.json({ error: "goal é obrigatório" }, { status: 400 });
        }

        const system = `
            Você é um planejador de estudos. Gere um plano de tarefas concisas e acionáveis,
            cobrindo o conteúdo essencial para atingir o objetivo descrito.
            Retorne **EXCLUSIVAMENTE** um JSON válido no formato abaixo, sem texto extra.

            Campos:
            - horizon_months: número de meses planejados
            - goal: objetivo sintetizado
            - tasks: lista de tarefas com:
            - title (obrigatório, curto, começando com verbo no infinitivo)
            - due_date (opcional, ISO yyyy-mm-dd, distribuída ao longo do horizonte)
            - status (opcional: "pending" | "completed")
            `;

        const user = `
            Objetivo: ${goal}
            Horizonte: ${months} meses

            Regras:
            - Gere de 24 a 48 tarefas (4 a 8 por mês), em ordem lógica e cronológica.
            - Distribua due_date ao longo dos ${months} meses.
            - Foque em blocos temáticos (revisão teórica, prática, simulado).
            - Seja específico para "Matemática para o ENEM" se aplicável.
            `;

        const res = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama3", 
                messages: [
                    { role: "system", content: system.trim() },
                    { role: "user", content: user.trim() },
                ],
                stream: false,
                format: "json",
                options: {
                    temperature: 0.4,
                    num_ctx: 4096,
                },
            }),
        });

        if (!res.ok) {
            const text = await res.text();
            return NextResponse.json({ error: "Falha ao chamar o modelo", detail: text }, { status: 500 });
        }

        const data = await res.json();
        const content = data?.message?.content;

        let parsed: PlanResponse;
        try {
            parsed = JSON.parse(content);
        } catch (e) {
            return NextResponse.json({ error: "Resposta do modelo não é JSON válido", content }, { status: 500 });
        }

        if (!Array.isArray(parsed.tasks)) {
            return NextResponse.json({ error: "JSON sem tasks[]", parsed }, { status: 500 });
        }

        return NextResponse.json(parsed);
    } catch (err: any) {
        return NextResponse.json({ error: "Erro interno", detail: err?.message }, { status: 500 });
    }
}
