import Layout from '../layout';
import PratosForm from './pratosForm';
import validateRequest from "@/util/validateSession";
import connectToDatabase from "@/util/mongoosedb";
import { useRouter} from "next/router";
import PDia from "@/models/dia";
import PCarne from "@/models/carne";
import PPeixe from "@/models/peixe";


const Office = ({pratosDia, pratosCarne, pratosPeixe}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const pDia = JSON.parse(pratosDia);
  const pCarne = JSON.parse(pratosCarne);
  const pPeixe = JSON.parse(pratosPeixe);
  

  return (
    <Layout>
      <PratosForm pratosDia={pDia} pratosCarne={pCarne} pratosPeixe={pPeixe}>
      </PratosForm>
    </Layout>
  )
};
export default Office;


export async function getServerSideProps(context) {
  //check if user have a session
	const user = await validateRequest(context.req, context.res);
  //if not redirect to login page
	if (!user) {
		return {
			redirect: {
				destination: "/signin",
				permanent: false
			}
		};
	}
  //get data from mongodb
  const db = await connectToDatabase();
  const dia = await PDia.find({});
  const carne = await PCarne.find({});
  const peixe = await PPeixe.find({});

  const pratosDia = JSON.stringify(dia[0]);
  const pratosCarne = JSON.stringify(carne[0]);
  const pratosPeixe = JSON.stringify(peixe[0]);

  return {
    props: { pratosDia, pratosCarne, pratosPeixe },
  }
}

