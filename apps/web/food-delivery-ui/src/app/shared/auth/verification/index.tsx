import { ACTIVATE_USER } from '@/graphql/actions/activation.action';
import { useMutation } from '@apollo/client';
import { PinInput } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Verification({ setActiveState }: { setActiveState: (e: string) => void }) {
  const [code, setCode] = useState('');
  const [ActivateUser, {loading}] = useMutation(ACTIVATE_USER)
  const activationToken = localStorage.getItem('activation_token')
  const handleVerify = async () => {
    if (code.length !== 4) {
      console.log('لطفاً یک کد 4 رقمی وارد کنید')
    } else {
      const data = {
        activationToken,
        activationCode: code,
      };
      try {
        await ActivateUser({
          variables:data
        })
        localStorage.removeItem("activation_token");
        toast.success("حساب شما با موفقیت فعال شد!");
        setActiveState('Login')
      } catch (error:any) {
        toast.error(error.message)
      }
    }
  };

  return (
    <div className='flex flex-col gap-9 items-center justify-center w-full'>
      <h5 className="text-xl font-bold text-center text-gray-800 p-3 bg-slate-50 w-full">کد ارسال شده را وارد کنید</h5>
      <PinInput
        size="xl"
        length={4}
        value={code}
        onChange={setCode}
      />
      <button
        onClick={handleVerify}
        className={`bg-teal-500 w-full rounded-md text-white flex items-center justify-center py-3 ${
          code.length === 4 && !loading ? 'hover:bg-teal-600' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={code.length !== 4 || loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        ) : (
          "تایید"
        )}
      </button>
    </div>
  );
}
