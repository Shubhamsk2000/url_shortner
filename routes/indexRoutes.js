import express from 'express';
import redis from '../services/redisClient.js';
import encodeBase62 from '../services/base64_helper.js';

const router = express.Router();

router.post("/shorturl", async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) return res.status(400).json({ error: "URL required" });

    const id = await redis.incr("url_id_counter");

    const shortCode = encodeBase62(id);

    await redis.set(shortCode, longUrl);

    res.status(200).json({
        status: true,
        shortUrl: `${process.env.BASE_URL}/api/${shortCode}`,
    })

});

router.get("/:code", async (req, res) => {
    const { code } = req.params;
    const url = await redis.get(code);

    if (!url) {
        return res.status(400).send("URL not found");
    }

    return res.redirect(url);
});

export default router;