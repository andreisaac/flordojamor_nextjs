import connectToDatabase from '@/util/mongoosedb'
import PratosPeixe from "@/models/peixe";


export default async function handler(req,res) {
  const { method } = req;

  const db = await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const pPeixe = await PratosPeixe.find({});
        res.status(200).json({ success: true, data: pPeixe });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const pPeixe = await PratosPeixe.findOneAndUpdate({},{date: new Date(), pratos: req.body},{upsert: true});
        await res.revalidate('/');
        res.status(201).json({ success: true, data: pPeixe });
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

