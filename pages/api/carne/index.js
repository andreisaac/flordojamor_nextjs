import connectToDatabase from '../../util/mongoosedb.js'
import PratosCarne from "../../../models/carne";


export default async function handler(req,res) {
  const { method } = req;

  const db = await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const pCarne = await PratosCarne.find({});
        res.status(200).json({ success: true, data: pCarne });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const pCarne = await PratosCarne.findOneAndUpdate({},{date: new Date(), pratos: req.body},{upsert: true});
        res.status(201).json({ success: true, data: pCarne });
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
