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
    <div className='flex flex-col gap-9 items-center justify-center w-full max-w-sm mx-auto'>
      <PinInput
        size="xl"
        length={4}
        value={code}
        onChange={setCode}
      />
      <button
        onClick={handleVerify}
        className={`bg-blue-500 w-full rounded-md text-white flex items-center justify-center py-2 ${
          code.length === 4 ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={code.length !== 4}
      >
        تایید
      </button>
    </div>
  );
}
