import React, { useState, useEffect } from 'react';

const OTPInput = () => {
  const [otp, setOtp] = useState('');

  const handleOTPFetch = async () => {
    if ('OTPCredential' in window) {
      console.log('Waiting for OTP...');

      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const otpCredential = await navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal,
        });

        if (otpCredential && otpCredential.code) {
          console.log('Received OTP:', otpCredential.code); // لاگ بررسی
          setOtp(otpCredential.code); // مقداردهی به OTP
        } else {
          console.error('Invalid OTP received or domain mismatch.');
        }
      } catch (error) {
        console.error('Error fetching OTP:', error);
      }
    } else {
      alert('Web OTP API not supported on this browser.');
    }
  };

  useEffect(() => {
    handleOTPFetch();
  }, []);

  return (
    <div className="mx-auto flex flex-col justify-center items-center w-32 h-32">
      <h2>Test OTP</h2>
      <input
        className="bg-gray-100 h-10 rounded-md text-black text-center"
        type="text"
        value={otp}
        placeholder="Enter OTP"
        // readOnly // فقط خواندنی چون به صورت خودکار پر می‌شود
      />
    </div>
  );
};

export default OTPInput;
