import React, { useState, useEffect } from 'react';

const OTPInput = () => {
  const [otp, setOtp] = useState('');

  const handleOTPFetch = async () => {
    if ('OTPCredential' in window) {
      try {
        // ایجاد یک signal برای مدیریت درخواست
        const controller = new AbortController();
        const signal = controller.signal;

        const otpCredential = await navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal, // مدیریت زمان درخواست
        });

        // بررسی اینکه پیامک حاوی کد OTP است
        if (otpCredential && otpCredential.code) {
          alert(otpCredential.code)
          setOtp(otpCredential.code); // کد OTP را تنظیم کنید
        } else {
          console.log('Invalid OTP received or domain mismatch');
          
          console.error('Invalid OTP received or domain mismatch.');
        }
      } catch (error) {
        alert('Error fetching OTP:', error);
      }
    } else {
      alert('Web OTP API not supported on this browser.');
    }
  };

  // اجرای خودکار handleOTPFetch هنگام بارگذاری کامپوننت
  useEffect(() => {
    handleOTPFetch();
  }, []);

  return (
    <div className='mx-auto flex flex-col justify-center items-center  w-32 h-32'>
      <h2>Test OTP</h2>
      <input
      className='bg-gray-100 h-10 rounded-md text-white text-center'
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        readOnly // فقط خواندنی چون به صورت خودکار پر می‌شود
      />
    </div>
  );
};

export default OTPInput;
