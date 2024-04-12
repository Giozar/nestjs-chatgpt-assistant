import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {

    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "Eres un asistente para los empleados de ToolFast empresa de herramientas industriales y ayudarás a los empleados sobre cualquier duda amablemente y tu nombre es Airinto",
            },
            {
                role: 'user',
                content: prompt,
            }
        ],
        model: "gpt-3.5-turbo",
    });

    console.log(completion);

    return completion.choices[0];
}