import connectToDatabase from '@/util/mongoosedb'
import PratosDia from "@/models/dia";
import { revalidatePath } from 'next/cache'
import type{ NextApiRequest, NextApiResponse  } from 'next'

export const dynamic = "force-dynamic";
export default async function handler(req: NextApiRequest,res: NextApiResponse ) {
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
        console.log(req.body);
      try {
        const pDia = await PratosDia.findOneAndUpdate({},{date: new Date(), pratos: req.body},{upsert: true});
        console.log(pDia);
        console.log(req.body);
        
        
        await res.revalidate("/");
        res.status(201).json({ success: true, data: pDia, revalidate: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

}
