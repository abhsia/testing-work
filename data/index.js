import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

// 读取 JSON 文件并汇总每个月的 GGR 值的函数
const calculateMonthlyGGR = (filePath: string) => {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const result: { [month: string]: number } = {};

    for (const month in data) {
        if (data.hasOwnProperty(month)) {
            const games = data[month];
            result[month] = games.reduce((sum: number, game: any) => sum + game.GGR, 0);
        }
    }

    return result;
};

// 获取每个月 GGR 总和的端点
app.get('/ggr', (req, res) => {
    const filePath = '/data/data.json';
    try {
        const result = calculateMonthlyGGR(filePath);
        res.json(result);
    } catch (error) {
        res.status(500).send('读取或处理文件时出错');
    }
});

app.listen(port, () => {
    console.log(`服务器正在运行在 http://localhost:${port}`);
});
