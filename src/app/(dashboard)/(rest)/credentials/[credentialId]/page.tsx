interface PageProps {
  params: Promise<{
    credentialId: string;
  }>
};

const Page = async ({params}: PageProps)=> {
   
    const { credentialId } = await params;

    return <p>CredentialId: {credentialId}</p>
}

export default Page;