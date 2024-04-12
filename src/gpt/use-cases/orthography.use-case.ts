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
                content: `
                Te serán prevídos textos en español con posibles errores ortográficos y gramaticales, Debes de responder en formato JSON,
                tu tarea es corregirlos y retornar información soluciones,
                también debes de dar un porcentaje de aciertos por el usuario,

                si no hay errores, retorna un mensaje de felicitaciones.

                Ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], // ['error > solución']
                    message: string, // Usa emojis y texto para felicitar al usuario
                }
                `,
            },
            {
                role: 'user',
                content: prompt,
            }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 100,
    });

    console.log(completion);

    return completion.choices[0];
}