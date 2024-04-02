import connectToDatabase from '@/util/mongoosedb'
import PratosDia from "@/models/dia";


export default async function handler(req,res) {
  const { method } = req;

  const db = await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const pDia = await PratosDia.find({});
        res.status(200).json({ success: true, data: pDia });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const pDia = await PratosDia.findOneAndUpdate({},{date: new Date(), pratos: req.body},{upsert: true});
        revalidatePath("/");
        revalidatePath("/office");
        res.status(201).json({ success: true, data: pDia });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

}
