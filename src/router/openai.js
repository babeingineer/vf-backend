import Router from "express"
import OpenAI from "openai"
const router = Router();
const openai = new OpenAI({
    apiKey: "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"
})

router.get("/", async (req, res) => {
    try {
        let message = `Generate ${req.query.count} ${req.query.tone} ${req.query.type} in ${req.query.category} field.
    ${req.query.prompt}
    Output must be Json format like following.
        {
        "1" : "first result",
        "2" : "second result",
        "3" : "third result",
        ...
        }
    `
        const chat = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": message }],
        });

        res.send(chat.choices[0]);
    }
    catch (err) { res.send(err); }
})

export default router;