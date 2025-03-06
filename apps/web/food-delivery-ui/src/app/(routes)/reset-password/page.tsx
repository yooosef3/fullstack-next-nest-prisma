import ResetPassword from "@/app/shared/auth/reset-password";


function page({searchParams}: {searchParams: 
    {
        [key: string]: string | string[] | undefined;
    }
}) {
const activationToken = searchParams['verify'] ?? ""
    
  return (
    <div>
        <ResetPassword activationToken={activationToken} />
    </div>
  )
}

export default page