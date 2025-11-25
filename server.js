import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

function buildImageUrl(item) {
  if (!item.path || !item.name || !item.extension) return null;
  return `https://admin.inonu.edu.tr/servlet/image/${item.path}/${item.name}_960x540.${item.extension}`;
}

app.get("/menu/:date", async (req, res) => {
  const date = req.params.date;

  try {
    const url = `https://admin.inonu.edu.tr/servlet/food?type=list&date=${date}`;
    const response = await fetch(url);
    const data = await response.json();

    const formatted = data.map(item => ({
      name: item.food_name,
      desc: item.food_desc,
      type: item.food_type,
      date: item.food_date,
      image: buildImageUrl(item)
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Yemekhane API çalışıyor!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
