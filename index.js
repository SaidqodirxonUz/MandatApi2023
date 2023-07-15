const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    if (req.query.id) {
      const a = req.query.id;
      const mandatResponse = await axios.get(
        `https://mandat.uzbmb.uz/Home2022/AfterFilter?name=${a}&region=0`
      );

      const ex = mandatResponse.data.split("\n");
      const aid = ex[1337]
        .replace('<td style="text-align: center">', "")
        .replace("</td>", "")
        .trim();
      const ismd = ex[1338].replace("<td>", "").replace("</td>", "").trim();
      const talim = ex[1339]
        .replace('<td style="text-align: center">', "")
        .replace("</td>", "")
        .trim();
      const muassasi = ex[1340]
        .replace('<td style="text-align: center">', "")
        .replace("</td>", "")
        .trim();
      const ball = ex[1341]
        .replace('<td style="text-align: center">', "")
        .replace("</td>", "")
        .trim();
      const tili = ex[1342]
        .replace('<td style="text-align: center">', "")
        .replace("</td>", "")
        .trim();
      const shakli = ex[1343]
        .replace('<td style="text-align: center">', "")
        .replace("</td>", "")
        .trim();

      const jsonData = {
        data: {
          id: aid,
          ism: ismd,
          yonalish: talim,
          muassasi: muassasi,
          tili: tili,
          ball: ball,
          shakli: shakli,
        },
      };

      res.json(jsonData);
    } else {
      res.json({
        data: {
          error: "error",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
