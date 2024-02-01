import { Product } from "@/modules/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const {
      title,
      description,
      price,
      images,
      category,
      categoryName,
      properties,
    } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      categoryName,
      properties,
    });
    res.json(productDoc);
  }
  if (method === "PUT") {
    const {
      title,
      description,
      price,
      images,
      category,
      categoryName,
      properties,
      _id,
    } = req.body;
    await Product.updateOne(
      { _id: _id },
      {
        title: title,
        description: description,
        price: price,
        images: images,
        category: category,
        categoryName: categoryName,
        properties: properties,
      }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
