"use client";
// @ts-ignore
// import useForm from "new-react-use-form";
import React, {
  FormEventHandler,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiCalls } from "@/api/calls/calls";
import { Calls } from "@/api/calls/type";
import Link from "next/link";
// import { LinkIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { AccountPersonItem } from "@/components/business_credit_elements/account-package/item";
import { useAP } from "@/context/business-credit/account-package/personal.account.pacakge.context";
import { handleFormError } from "@/utils/error";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { ArrowForward } from "@mui/icons-material";

// import { LinkOption } from "@/components/link/add-client/link.option3";
import Image from "next/image";
import { getCookie } from "@/utils/getCookie";
import { useAuth } from "@/context/guard/guard.context";
// import { objectUtil } from "zod";
// interface Option {
//   label: string;
// }
export const AccountPackageStep1Form = () => {
  const router = useRouter();
  const customProp = usePathname();
  const { isSignIn } = useAuth();
  const {
    SetFormID,
    SetIsPending,
    SetButtonText,
    SetMobileH4,
    SetMobileText,
    SetMobileValue,
  } = useAP();
  // const [showPassword, setShowPassword] = React.useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  // const form = useForm({
  //   firstName: "",
  //   lastName: "",
  //   gender: "",
  //   dob: "",
  //   ssn: "",
  //   cityName: "",
  //   zipCode: "",
  //   state: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   cnfPassword: "",
  //   policy: null,
  // });

  const personItems = [
    {
      icon: "scaling",
      title: "SCALING SPECIALISTS",
      subtitle:
        "We're experts at scaling up credit and transforming financial futures.",
    },
    {
      icon: "tailored",
      title: "TAILORED SOLUTIONS",
      subtitle:
        "Our strategies are customized to your unique credit goals and needs",
    },
    {
      icon: "proven",
      title: "PROVEN OUTCOMES",
      subtitle: "Our track record of success showcases the results we deliver",
    },
    {
      icon: "transparent",
      title: "TRANSPARENT PROGRESS",
      subtitle:
        "Scaling your credit means unlocking better opportunities and financial freedom",
    },
    {
      icon: "unleash",
      title: "UNLEASH FINANCIAL POTENTIAL",
      subtitle:
        "Stay updated on your scaling journey with regular progress reports.",
    },
  ];

  const { data, isLoading } =
    useQuery<Calls.IResponse.ModuleOnePackageResponse>({
      queryKey: ["get_module_ome_plans"],
      queryFn: () => ApiCalls.Module.one.plans(),
    });

  const { mutateAsync, isPending } = useMutation<
    Calls.IResponse.ModulesSignUp,
    Error,
    Calls.IRequest.ModuleOneSignUp
  >({
    mutationFn: (variables) => ApiCalls.Module.one.signUp(variables),
    onSuccess: (r) => {
      toast.success(r.message);
      Cookies.set("accessToken", r.accessToken, {
        expires: 7,
        path: "/",
        secure: true,
      });
      Cookies.set("refreshToken", r.refreshToken, {
        expires: 30,
        path: "/",
        secure: true,
      });
      if (r?.urlPath != null) {
        router.replace(r?.urlPath);
      }
    },
    // onError: (e) => {
    //   // handleFormError(e as any, form);
    //   const error = handleFormError(e as any, form);
    //   // @ts-ignore
    //   toast.error(error?.message);
    // },
  });
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // await mutateAsync(form.originalData);
  };
  useLayoutEffect(() => {
    SetFormID("sign-up");
    SetMobileH4("Create your account");
    SetButtonText("ADD SINGLE CLIENT CREDIT");
    SetMobileText("1/6");
    SetMobileValue(20);
  }, []);
  useEffect(() => {
    if (isPending) {
      SetIsPending(true);
    } else {
      SetIsPending(false);
    }
  }, [isPending]);

  const linksButton = data && data?.data[3]?.bulletPoints;
  const numericFullValue = parseFloat(
    data?.data[3]?.pricing.fullPrice.$numberDecimal
  );
  const numericEmiValue = parseFloat(
    data?.data[3]?.pricing?.emiPrice.$numberDecimal
  );

  const setRouter = () => {
    // localStorage.setItem("lastPageUrl", customProp);
    Cookies.set("lastPageUrl", customProp); 
  };

  return (
    <>
      {isLoading ? (
        <>
          <div
            className={"bg-white flex h-screen justify-center items-center "}
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </>
      ) : (
        <form
          onSubmit={onSubmit}
          id={"option3"}
          className={
            " md:mt-10 mb-1 flex flex-col h-fit justify-start items-start  md:px-8 px-[16px] w-full"
          }
        >
          <div className="w-full justify-center text-center text-4xl">
            EMBARK ON YOUR{" "}
            <span className=" text-red-800">"BUSINESS CREDIT"</span> SCALING
            JOURNEY.
          </div>
          <div className="flex flex-col w-full justify-center content-center items-center">
            <div className="w-[75%] justify-center text-center text-2xl mt-8">
              Your Journey Begins Here With TGI Scale ME, The Key To Scaling Up
              Your <span className=" text-blue-800">Financial Future!</span>
            </div>
            <div className="w-[50 %] justify-center text-center text-base mt-6">
              Let's Start Scaling Up Your Credit Together.
            </div>
          </div>

          <div className="flex flex-col w-full mt-[1rem] justify-center content-center items-center">
            {/* <div className="flex flex-col col-start-4 col-end-10 w-full justify-center content-center items-center bg-[#FAFAFA] mt-6 rounded-[5rem]"> */}

            <div className="flex w-[400px] justify-center h-50 mt-6 relative">
              <img
                src={"/business-account/banner.png"}
                alt=""
                className="account-package-img"
              />
            </div>
            <div className="flex flex-col p-10 w-[400px] justify-center content-center items-center border border-gray-300 pt-[11rem] mt-[-10.5rem] rounded-b-[5rem]">
              <div className="flex md:w-[80%] text-gray-700 gap-3.5  justify-center content-center items-center space-y-[-0.5rem] mt-3">
                <span className="text-3xl text-[#434343] font-bold">
                  ${numericFullValue || 0}
                </span>
                <span className="text-5xl border border-[#2684FF] rotate-[28deg] h-[45px]" />
                {/* $ {Number(data?.data[3]?.emiPrice) * Number(data?.data[3]?.pricing.intervalCount) -
                  Number(data?.data[3]?.fullPrice)}  */}
                <span className="text-sm text-[#434343] font-regular">
                  One Time Payment <br /> (Save You $200
                  {/* {Number(data?.data[3]?.pricing?.emiPrice || 0) * Number(data?.data[3]?.pricing?.intervalCount || 0) -  Number(data?.data[3]?.pricing?.fullPrice || 0)
                    } */}
                  )
                </span>
              </div>
              <div className="flex w-[65px] h-[35px] justify-center content-center items-center rounded-[15px] py-1 pt-2 bg-gradient-to-t from-[#50D910] to-[#38B000] mt-3">
                <h1
                  style={{
                    textShadow: "rgb(0 0 0 / 25%) 0px 4px 4px",
                  }}
                  className="flex justify-center content-center items-center w-[42px] h-[20px] text-[24px] font-bold text-white "
                >
                  OR
                </h1>
              </div>
              <div className="text-[#151414] text-[15px] mt-2">
                {Number(numericEmiValue || 0)} Monthly
              </div>

              <div
                style={{
                  borderTop: "1.5px solid #E9E9E9",
                  borderBottom: "1.5px solid #E9E9E9",
                  marginTop: "20px",
                }}
              >
                {linksButton?.map((e: any) => {
                  return (
                    <>
                      <div className="flex flex-row my-[20px]">
                        <ArrowForward
                          style={{
                            marginRight: "10px",
                            color: "#DFDDDD",
                            fontSize: "1.5rem",
                          }}
                        />
                        <p
                          style={{
                            fontSize: "15px",
                            marginLeft: "1,5rem",
                            color: "#737373",
                            fontWeight: "500",
                          }}
                        >
                          {e.value}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>

              <div className="flex w-[80%] rounded-full mt-8">
                <button
                  //disabled={data?.data[3]?._id === undefined}
                  onClick={() => {
                    const id = data?.data[3]?._id;
                    if (isSignIn) {
                      router.push(`/checkout/one/${id}`);
                    } else {
                      router.push(`/authentication/sign-in`);
                      setRouter();
                    }
                  }}
                  className="relative overflow-hidden w-[100%] text-xl p-4 text-white font-semibold uppercase bg-gradient-to-r from-[#FB8500] to-[#FFD703] border-[1px] border-amber-400 tracking-tight transition-all duration-300"
                  style={{
                    boxShadow: "rgba(255, 183, 3, 0.65) 4px 6px 20px 1px",
                    borderRadius: "4rem",
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
            <div className="flex w-[400px] rounded-[5rem] mt-28">
              {/* <Link href={"/step1/build-business-credit"} style={{ height: '5rem', width: '100%' }}>  */}
              <Button
                style={{
                  height: "5rem",
                  backgroundColor: "rgb(46, 45, 45)",
                  borderRadius: "2rem",
                  fontSize: "2rem",
                }}
                // disabled={data?.data[3]?._id === undefined}
                onClick={() => {
                  const id = data?.data[3]?._id;
                  if (isSignIn) {
                    router.push(`/checkout/one/${id}`);
                  } else {
                    router.push("/authentication/sign-in");
                    setRouter();
                  }
                }}
              >
                CONTINUE
              </Button>
              {/* </Link>  */}
            </div>
          </div>
          <div className="flex flex-wrap flex-row gap-20 w-full content-center justify-center items-center my-[4rem]">
            <div
              className="flex flex-col w-[360px] h-[290px] justify-center content-center items-center text-center bg-[#FAFAFA]
               p-4"
            >
              <div className="flex w-28 h-28 bg-blue-700 justify-center content-center items-center rounded-full">
                <svg
                  width="44"
                  height="46"
                  viewBox="0 0 44 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.26357 0.881348C1.95785 0.881348 0.899414 1.99623 0.899414 3.36993V35.7215C0.899414 41.2188 5.13338 45.6759 10.356 45.6759H41.09C42.3951 45.6759 43.4542 44.561 43.4542 43.1873C43.4542 41.8136 42.3951 40.6987 41.09 40.6987H10.356C7.74459 40.6987 5.62772 38.4714 5.62772 35.7215V3.36993C5.62772 1.99623 4.56929 0.881348 3.26357 0.881348ZM26.9051 5.85852V10.8357H35.3262L28.7515 17.7565C28.5387 17.9829 27.8744 18.3014 27.5694 18.3014H23.8766C22.3187 18.3014 20.3966 19.0854 19.2949 20.245L11.0208 28.9551C10.0976 29.9281 10.0976 31.5606 11.0208 32.5336C11.4825 33.0189 12.1152 33.2329 12.7202 33.2329C13.3252 33.2329 13.9578 33.0189 14.4195 32.5336L22.6946 23.8236C22.9073 23.5971 23.5717 23.2786 23.8766 23.2786H27.5694C29.1274 23.2786 31.0495 22.4947 32.1512 21.335L38.7259 14.4142V23.2786H43.4542V8.3471C43.4542 6.9734 42.3951 5.85852 41.09 5.85852H26.9051Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex w-full font-bold text-2xl justify-center items-center mt-4 scaling-specialists-heading">
                SCALING SPECIALISTS
              </div>
              <div className="flex w-[80%] justify-center content-center items-center scaling-specialists-paragraph">
                We're experts at scaling up credit and transforming financial
                futures.
              </div>
            </div>
            <div
              className="flex flex-col w-[360px] h-[290px] justify-center content-center items-center text-center bg-[#FAFAFA]
               p-4"
            >
              <div className="flex w-28 h-28 bg-blue-700 justify-center content-center items-center rounded-full">
                <svg
                  width="68"
                  height="72"
                  viewBox="0 0 68 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M48.1267 50.8759L46.4651 49.7628L48.1267 50.8759ZM19.4391 22.2638L18.33 20.5995L19.4391 22.2638ZM26.3713 19.2946L25.9315 17.3436L26.3713 19.2946ZM51.1038 43.962L49.1532 43.5201L51.1038 43.962ZM45.7388 13.4815L44.9752 15.33L45.7388 13.4815ZM56.9322 24.6454L58.7793 23.8783L56.9322 24.6454ZM50.3846 32.5395V34.5395V32.5395ZM48.1653 32.5395V30.5395V32.5395ZM37.8239 22.2254H35.8239H37.8239ZM37.8239 20.0119H39.8239H37.8239ZM49.1532 43.5201C48.6511 45.7363 47.744 47.8539 46.4651 49.7628L49.7883 51.9891C51.3419 49.6702 52.4442 47.0971 53.0543 44.4039L49.1532 43.5201ZM46.4651 49.7628C44.4129 52.8261 41.4954 55.2144 38.081 56.625L39.6083 60.322C43.7524 58.6099 47.2953 55.7104 49.7883 51.9891L46.4651 49.7628ZM38.081 56.625C34.6665 58.0356 30.9091 58.4048 27.2839 57.6856L26.5056 61.6091C30.9045 62.4818 35.4642 62.034 39.6083 60.322L38.081 56.625ZM27.2839 57.6856C23.6588 56.9664 20.3297 55.1914 17.7172 52.5858L14.8925 55.4179C18.0651 58.5821 22.1066 60.7364 26.5056 61.6091L27.2839 57.6856ZM17.7172 52.5858C15.1048 49.9802 13.3263 46.6612 12.6059 43.0487L8.68312 43.8311C9.55874 48.2215 11.7199 52.2537 14.8925 55.4179L17.7172 52.5858ZM12.6059 43.0487C11.8854 39.4362 12.2551 35.6918 13.6685 32.2886L9.97441 30.7544C8.25694 34.8898 7.80749 39.4406 8.68312 43.8311L12.6059 43.0487ZM13.6685 32.2886C15.0819 28.8853 17.4758 25.9756 20.5482 23.9281L18.33 20.5995C14.5999 23.0853 11.6919 26.619 9.97441 30.7544L13.6685 32.2886ZM20.5482 23.9281C22.4628 22.6522 24.5872 21.7469 26.811 21.2457L25.9315 17.3436C23.233 17.9517 20.6543 19.0505 18.33 20.5995L20.5482 23.9281ZM28.9297 23.3714V27.9554H32.9297V23.3714H28.9297ZM42.4201 41.4155H47.0162V37.4155H42.4201V41.4155ZM28.9297 27.9554C28.9297 35.3942 34.9745 41.4155 42.4201 41.4155V37.4155C37.1737 37.4155 32.9297 33.1751 32.9297 27.9554H28.9297ZM26.811 21.2457C27.3484 21.1246 27.826 21.2752 28.2165 21.6385C28.6297 22.023 28.9297 22.6467 28.9297 23.3714H32.9297C32.9297 19.8867 29.9604 16.4356 25.9315 17.3436L26.811 21.2457ZM53.0543 44.4039C53.9686 40.3684 50.4938 37.4155 47.0162 37.4155V41.4155C47.7479 41.4155 48.3756 41.7169 48.7612 42.129C49.125 42.518 49.2732 42.9903 49.1532 43.5201L53.0543 44.4039ZM44.9752 15.33C47.2423 16.2666 49.3018 17.6392 51.0364 19.3692L53.8611 16.5371C51.7546 14.4361 49.2541 12.7698 46.5025 11.6331L44.9752 15.33ZM51.0364 19.3692C52.771 21.0993 54.1467 23.1528 55.0852 25.4125L58.7793 23.8783C57.6389 21.1326 55.9677 18.6381 53.8611 16.5371L51.0364 19.3692ZM50.3846 30.5395H48.1653V34.5395H50.3846V30.5395ZM39.8239 22.2254V20.0119H35.8239V22.2254H39.8239ZM55.0852 25.4125C55.617 26.693 55.3294 27.8657 54.4873 28.8161C53.5996 29.818 52.0914 30.5395 50.3846 30.5395V34.5395C53.1634 34.5395 55.7873 33.3805 57.4812 31.4687C59.2207 29.5055 59.964 26.7311 58.7793 23.8783L55.0852 25.4125ZM48.1653 30.5395C43.5535 30.5395 39.8239 26.8122 39.8239 22.2254H35.8239C35.8239 29.0312 41.3543 34.5395 48.1653 34.5395V30.5395ZM46.5025 11.6331C43.6485 10.454 40.8724 11.1926 38.9049 12.9266C36.9882 14.6159 35.8239 17.2353 35.8239 20.0119H39.8239C39.8239 18.3147 40.5451 16.8129 41.5497 15.9274C42.5036 15.0867 43.685 14.797 44.9752 15.33L46.5025 11.6331Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex w-full font-bold text-2xl justify-center items-center  scaling-specialists-heading mt-4">
                TAILORED SOLUTIONS
              </div>
              <div className="flex w-[80%] justify-center content-center items-center scaling-specialists-paragraph">
                Our strategies are customized to your unique credit goals and
                needs
              </div>
            </div>
            <div
              className="flex flex-col w-[360px] h-[290px] justify-center content-center items-center text-center bg-[#FAFAFA]
               p-4"
            >
              <div className="flex w-28 h-28 bg-blue-700 justify-center content-center items-center rounded-full">
                <svg
                  width="56"
                  height="55"
                  viewBox="0 0 56 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.2042 13.9503L23.7733 13.5002L25.2042 13.9503ZM20.0426 22.6125L20.943 21.4128L20.0426 22.6125ZM21.2611 26.4863L22.692 26.9364L21.2611 26.4863ZM26.4227 30.3601L25.5223 29.1604L26.4227 30.3601ZM30.3658 30.3601L31.2662 29.1604L30.3658 30.3601ZM35.5274 26.4863L34.0965 26.9364L35.5274 26.4863ZM36.7459 22.6125L35.8455 21.4128L36.7459 22.6125ZM31.5843 13.9503L33.0152 13.5002L31.5843 13.9503ZM23.2143 42.8019L21.9153 42.0519L23.2143 42.8019ZM18.9368 50.2108L20.2358 50.9608L18.9368 50.2108ZM3.6295 41.3731L2.33046 40.6231L3.6295 41.3731ZM7.90703 33.9642L9.20606 34.7142L7.90703 33.9642ZM14.3504 49.818L12.931 50.3032H12.931L14.3504 49.818ZM13.7566 48.081L15.1759 47.5958L15.1759 47.5958L13.7566 48.081ZM8.06408 44.7944L7.7746 43.3226H7.7746L8.06408 44.7944ZM6.26284 45.1487L6.55232 46.6205H6.55233L6.26284 45.1487ZM11.9374 44.6587L12.6874 43.3597H12.6874L11.9374 44.6587ZM2.28353 45.1743L1.05323 46.0324L2.28353 45.1743ZM24.4495 40.6125L23.2511 39.7103L23.1791 39.806L23.1232 39.9118L24.4495 40.6125ZM32.8964 42.8019L34.1955 42.0519L32.8964 42.8019ZM37.174 50.2108L38.473 49.4608L37.174 50.2108ZM52.4813 41.3731L53.7803 40.6231L52.4813 41.3731ZM48.2037 33.9642L46.9047 34.7142L48.2037 33.9642ZM41.7604 49.818L43.1797 50.3032L41.7604 49.818ZM42.3542 48.081L40.9348 47.5958V47.5958L42.3542 48.081ZM48.0467 44.7944L48.3362 43.3226L48.0467 44.7944ZM49.8479 45.1487L49.5584 46.6205H49.5584L49.8479 45.1487ZM53.8272 45.1743L55.0575 46.0324H55.0575L53.8272 45.1743ZM31.6507 40.5925H30.1507V40.9635L30.3237 41.2918L31.6507 40.5925ZM24.6023 40.4095L24.8926 38.9378L24.6023 40.4095ZM31.6507 40.5073L31.4018 39.0281L31.6507 40.5073ZM45.7145 30.2239L44.3818 29.5356L45.7145 30.2239ZM10.0853 30.5475L11.2125 31.5372L10.0853 30.5475ZM10.4128 21.2969C10.4128 11.366 18.4634 3.31543 28.3943 3.31543V0.31543C16.8065 0.31543 7.41282 9.70914 7.41282 21.2969H10.4128ZM28.3943 3.31543C38.3251 3.31543 46.3757 11.366 46.3757 21.2969H49.3757C49.3757 9.70914 39.982 0.31543 28.3943 0.31543V3.31543ZM22.0142 17.8445C24.149 17.8445 25.9976 16.4271 26.6351 14.4004L23.7733 13.5002C23.5127 14.3287 22.7857 14.8445 22.0142 14.8445V17.8445ZM20.943 21.4128C19.38 20.2397 20.3144 17.8445 22.0142 17.8445V14.8445C17.2154 14.8445 15.4478 21.0395 19.1422 23.8122L20.943 21.4128ZM22.692 26.9364C23.3272 24.9169 22.6398 22.6862 20.943 21.4128L19.1422 23.8122C19.7967 24.3033 20.0931 25.2005 19.8302 26.0362L22.692 26.9364ZM25.5223 29.1604C24.8023 29.7008 23.9972 29.6237 23.38 29.1604C22.7557 28.6919 22.3974 27.873 22.692 26.9364L19.8302 26.0362C19.1207 28.2918 20.0288 30.3963 21.5792 31.5598C23.1366 32.7287 25.4144 32.9923 27.3231 31.5598L25.5223 29.1604ZM31.2662 29.1604C29.5571 27.8777 27.2314 27.8777 25.5223 29.1604L27.3231 31.5598C27.9652 31.0779 28.8233 31.0779 29.4654 31.5598L31.2662 29.1604ZM34.0965 26.9364C34.3911 27.873 34.0328 28.6919 33.4085 29.1604C32.7913 29.6237 31.9863 29.7008 31.2662 29.1604L29.4654 31.5598C31.3741 32.9923 33.6519 32.7287 35.2093 31.5598C36.7597 30.3963 37.6678 28.2918 36.9583 26.0362L34.0965 26.9364ZM35.8455 21.4128C34.1487 22.6862 33.4613 24.9169 34.0965 26.9364L36.9583 26.0362C36.6954 25.2005 36.9918 24.3033 37.6463 23.8122L35.8455 21.4128ZM34.7743 17.8445C36.4741 17.8445 37.4086 20.2397 35.8455 21.4128L37.6463 23.8122C41.3407 21.0395 39.5731 14.8445 34.7743 14.8445V17.8445ZM30.1534 14.4004C30.7909 16.4271 32.6396 17.8445 34.7743 17.8445V14.8445C34.0029 14.8445 33.2758 14.3287 33.0152 13.5002L30.1534 14.4004ZM33.0152 13.5002C31.5708 8.90812 25.2177 8.90812 23.7733 13.5002L26.6351 14.4004C27.1989 12.6081 29.5896 12.6081 30.1534 14.4004L33.0152 13.5002ZM21.9153 42.0519L17.6377 49.4608L20.2358 50.9608L24.5134 43.5519L21.9153 42.0519ZM4.92854 42.1231L9.20606 34.7142L6.60799 33.2142L2.33046 40.6231L4.92854 42.1231ZM15.7697 49.3328L15.1759 47.5958L12.3372 48.5662L12.931 50.3032L15.7697 49.3328ZM7.7746 43.3226L5.97335 43.6769L6.55233 46.6205L8.35357 46.2662L7.7746 43.3226ZM15.1759 47.5958C14.8519 46.6477 14.5659 45.8027 14.2452 45.1471C13.9063 44.4542 13.4496 43.7997 12.6874 43.3597L11.1874 45.9578C11.2342 45.9847 11.3503 46.0563 11.5504 46.4653C11.7686 46.9115 11.9878 47.5441 12.3372 48.5662L15.1759 47.5958ZM8.35357 46.2662C9.41344 46.0578 10.0709 45.9313 10.5664 45.8972C11.0206 45.866 11.1407 45.9308 11.1874 45.9578L12.6874 43.3597C11.9252 42.9196 11.1301 42.8514 10.3606 42.9043C9.63243 42.9544 8.75766 43.1293 7.7746 43.3226L8.35357 46.2662ZM2.33046 40.6231C1.75202 41.625 1.23129 42.5195 0.938188 43.2482C0.659175 43.9419 0.356414 45.0334 1.05323 46.0324L3.51384 44.3162C3.74634 44.6496 3.51313 44.8857 3.72147 44.3677C3.91571 43.8848 4.30012 43.2116 4.92854 42.1231L2.33046 40.6231ZM5.97335 43.6769C4.75133 43.9173 4.00245 44.0606 3.49407 44.0859C2.9527 44.1128 3.27305 43.971 3.51384 44.3162L1.05323 46.0324C1.75834 47.0434 2.89668 47.1193 3.64305 47.0822C4.42242 47.0434 5.43103 46.841 6.55232 46.6205L5.97335 43.6769ZM17.6377 49.4608C17.0093 50.5492 16.6185 51.2188 16.2974 51.6285C15.953 52.0678 16.0409 51.7478 16.4458 51.7825L16.1898 54.7716C17.4035 54.8755 18.1974 54.0675 18.6586 53.4791C19.1431 52.8609 19.6574 51.9627 20.2358 50.9608L17.6377 49.4608ZM12.931 50.3032C13.3007 51.3846 13.6297 52.3592 13.9859 53.0536C14.3269 53.7185 14.9618 54.6664 16.1898 54.7716L16.4458 51.7825C16.8652 51.8184 16.9026 52.1667 16.6552 51.6844C16.4229 51.2315 16.1726 50.5113 15.7697 49.3328L12.931 50.3032ZM9.20606 34.7142C10.2385 32.926 10.7344 32.0817 11.2125 31.5372L8.95805 29.5579C8.23509 30.3814 7.56777 31.5518 6.60799 33.2142L9.20606 34.7142ZM24.5134 43.5519C25.026 42.6639 25.4482 41.9331 25.7757 41.3132L23.1232 39.9118C22.8279 40.4706 22.4384 41.1458 21.9153 42.0519L24.5134 43.5519ZM31.5974 43.5519L35.8749 50.9608L38.473 49.4608L34.1955 42.0519L31.5974 43.5519ZM53.7803 40.6231L49.5028 33.2142L46.9047 34.7142L51.1822 42.1231L53.7803 40.6231ZM43.1797 50.3032L43.7735 48.5662L40.9348 47.5958L40.341 49.3328L43.1797 50.3032ZM47.7572 46.2662L49.5584 46.6205L50.1374 43.6769L48.3362 43.3226L47.7572 46.2662ZM43.7735 48.5662C44.1229 47.5441 44.3421 46.9115 44.5604 46.4653C44.7604 46.0563 44.8766 45.9847 44.9233 45.9578L43.4233 43.3597C42.6611 43.7997 42.2045 44.4542 41.8655 45.1471C41.5448 45.8027 41.2589 46.6477 40.9348 47.5958L43.7735 48.5662ZM48.3362 43.3226C47.3531 43.1293 46.4783 42.9544 45.7502 42.9043C44.9806 42.8514 44.1855 42.9196 43.4233 43.3597L44.9233 45.9578C44.9701 45.9308 45.0902 45.866 45.5443 45.8972C46.0399 45.9313 46.6973 46.0578 47.7572 46.2662L48.3362 43.3226ZM51.1822 42.1231C51.8106 43.2116 52.195 43.8848 52.3893 44.3677C52.5976 44.8857 52.3644 44.6496 52.5969 44.3162L55.0575 46.0324C55.7543 45.0334 55.4516 43.9419 55.1726 43.2482C54.8795 42.5195 54.3587 41.625 53.7803 40.6231L51.1822 42.1231ZM49.5584 46.6205C50.6797 46.841 51.6883 47.0434 52.4677 47.0822C53.2141 47.1193 54.3524 47.0434 55.0575 46.0324L52.5969 44.3162C52.8377 43.971 53.158 44.1128 52.6167 44.0859C52.1083 44.0606 51.3594 43.9173 50.1374 43.6769L49.5584 46.6205ZM35.8749 50.9608C36.4534 51.9627 36.9677 52.8609 37.4522 53.4791C37.9134 54.0675 38.7073 54.8755 39.9209 54.7716L39.6649 51.7825C40.0699 51.7478 40.1577 52.0678 39.8134 51.6285C39.4923 51.2188 39.1014 50.5492 38.473 49.4608L35.8749 50.9608ZM40.341 49.3328C39.9382 50.5113 39.6878 51.2315 39.4555 51.6844C39.2082 52.1667 39.2456 51.8184 39.6649 51.7825L39.9209 54.7716C41.149 54.6664 41.7838 53.7185 42.1249 53.0536C42.481 52.3592 42.8101 51.3846 43.1797 50.3032L40.341 49.3328ZM34.1955 42.0519C33.6663 41.1353 33.2739 40.4552 32.9777 39.8932L30.3237 41.2918C30.653 41.9167 31.079 42.654 31.5974 43.5519L34.1955 42.0519ZM12.2719 29.2691C11.0822 26.8683 10.4128 24.1629 10.4128 21.2969H7.41282C7.41282 24.6352 8.19357 27.7955 9.58381 30.6011L12.2719 29.2691ZM28.3943 39.2783C27.1947 39.2783 26.0241 39.161 24.8926 38.9378L24.312 41.8811C25.6336 42.1418 26.9987 42.2783 28.3943 42.2783V39.2783ZM24.8926 38.9378C19.3481 37.844 14.7138 34.1972 12.2719 29.2691L9.58381 30.6011C12.4307 36.3465 17.8331 40.603 24.312 41.8811L24.8926 38.9378ZM25.6478 41.5147L25.8007 41.3117L23.4039 39.5073L23.2511 39.7103L25.6478 41.5147ZM31.4018 39.0281C30.4248 39.1925 29.4201 39.2783 28.3943 39.2783V42.2783C29.5876 42.2783 30.7588 42.1785 31.8996 41.9865L31.4018 39.0281ZM33.1507 40.5925V40.5073H30.1507V40.5925H33.1507ZM46.3757 21.2969C46.3757 24.2693 45.6556 27.0691 44.3818 29.5356L47.0473 30.9123C48.5358 28.0301 49.3757 24.7594 49.3757 21.2969H46.3757ZM44.3818 29.5356C41.8318 34.4731 37.0631 38.0754 31.4018 39.0281L31.8996 41.9865C38.5154 40.8732 44.0749 36.6677 47.0473 30.9122L44.3818 29.5356ZM49.5028 33.2142C48.391 31.2887 47.6694 30.007 46.7445 29.1335L44.6846 31.3144C45.21 31.8107 45.6845 32.6009 46.9047 34.7142L49.5028 33.2142ZM11.2125 31.5372C11.2663 31.4759 11.3747 31.3879 11.5944 31.2789L10.2613 28.5914C9.85275 28.794 9.36688 29.0922 8.95805 29.5579L11.2125 31.5372Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex w-full font-bold text-2xl justify-center items-center scaling-specialists-heading mt-4">
                PROVEN OUTCOMES
              </div>
              <div className="flex w-[80%] justify-center content-center items-center scaling-specialists-paragraph">
                Our track record of success showcases the results we deliver
              </div>
            </div>
            <div
              className="flex flex-col w-[360px] h-[290px] justify-center content-center items-center text-center bg-[#FAFAFA]
               p-4"
            >
              <div className="flex w-28 h-28 bg-blue-700 justify-center content-center items-center rounded-full">
                <svg
                  width="60"
                  height="64"
                  viewBox="0 0 60 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7328 39.9005L19.9606 31.2818C22.096 26.9285 28.3722 27.1411 30.2082 31.6289C32.0441 36.1167 38.3203 36.3293 40.4558 31.9761L44.6835 23.3573M57.7874 31.6289C57.7874 39.0035 57.7874 42.6907 56.1916 45.8016C55.973 46.2276 55.7335 46.6426 55.4738 47.0449C53.5776 49.9823 50.3844 51.826 43.9978 55.5133C37.6112 59.2005 34.418 61.0442 30.926 61.2175C30.4477 61.2413 29.9686 61.2413 29.4904 61.2175C25.9984 61.0442 22.8051 59.2005 16.4185 55.5133C10.032 51.826 6.8387 49.9823 4.94256 47.0449C4.68288 46.6426 4.44332 46.2276 4.22476 45.8016C2.62891 42.6908 2.62891 39.0035 2.62891 31.6289C2.62891 24.2543 2.62891 20.5671 4.22476 17.4562C4.44331 17.0302 4.68287 16.6153 4.94256 16.213C6.8387 13.2755 10.032 11.4318 16.4185 7.74456C22.8051 4.05728 25.9984 2.21364 29.4904 2.04027C29.9686 2.01653 30.4477 2.01652 30.926 2.04027C34.418 2.21364 37.6112 4.05728 43.9978 7.74456C50.3844 11.4318 53.5776 13.2755 55.4738 16.213C55.7335 16.6152 55.973 17.0302 56.1916 17.4562C57.7874 20.5671 57.7874 24.2543 57.7874 31.6289Z"
                    stroke="white"
                    stroke-width="4"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </div>
              <div className="flex w-full font-bold text-2xl justify-center items-center scaling-specialists-heading mt-4">
                TRANSPARENT PROGRESS
              </div>
              <div className="flex w-[80%] justify-center content-center items-center scaling-specialists-paragraph">
                Scaling your credit means unlocking better opportunities and
                financial freedom
              </div>
            </div>
            <div
              className="flex flex-col w-[360px] h-[290px] justify-center content-center items-center text-center bg-[#FAFAFA]
               p-4"
            >
              <div className="flex w-28 h-28 bg-blue-700 justify-center content-center items-center rounded-full">
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.60627 42.9494L7.39002 41.6704L6.60627 42.9494ZM3.11254 39.4556L4.3915 38.6719L3.11254 39.4556ZM42.3237 39.4556L41.0448 38.6719L42.3237 39.4556ZM38.83 42.9494L38.0463 41.6704L38.83 42.9494ZM38.83 10.0877L38.0463 11.3666L38.83 10.0877ZM42.3237 13.5814L41.0448 14.3651L42.3237 13.5814ZM6.60627 10.0877L7.39002 11.3666L6.60627 10.0877ZM3.11254 13.5814L4.3915 14.3651L3.11254 13.5814ZM36.4263 3.33527L37.5088 2.29693V2.29693L36.4263 3.33527ZM5.4564 4.06407L6.36209 5.25978L5.4564 4.06407ZM3.36154 6.24804L4.59217 7.10567L3.36154 6.24804ZM37.5337 8.80405H39.0337L39.0336 8.79664L37.5337 8.80405ZM36.1868 26.6717C37.0152 26.6717 37.6868 26.0001 37.6868 25.1717C37.6868 24.3432 37.0152 23.6717 36.1868 23.6717V26.6717ZM30.4145 23.6717C29.5861 23.6717 28.9145 24.3432 28.9145 25.1717C28.9145 26.0001 29.5861 26.6717 30.4145 26.6717V23.6717ZM19.5434 10.0282H25.8929V7.02822H19.5434V10.0282ZM25.8929 43.0088H19.5434V46.0088H25.8929V43.0088ZM19.5434 43.0088C16.0502 43.0088 13.5357 43.0072 11.573 42.8206C9.63265 42.6361 8.38711 42.2814 7.39002 41.6704L5.82252 44.2283C7.3702 45.1767 9.1291 45.6018 11.289 45.8071C13.4267 46.0104 16.1083 46.0088 19.5434 46.0088V43.0088ZM0.0531002 26.5185C0.0531002 29.9536 0.0515176 32.6352 0.254765 34.7728C0.460134 36.9328 0.885158 38.6917 1.83358 40.2394L4.3915 38.6719C3.78048 37.6748 3.42579 36.4292 3.2413 34.4889C3.05468 32.5262 3.0531 30.0117 3.0531 26.5185H0.0531002ZM7.39002 41.6704C6.16791 40.9215 5.1404 39.894 4.3915 38.6719L1.83358 40.2394C2.82985 41.8651 4.19675 43.232 5.82252 44.2283L7.39002 41.6704ZM25.8929 46.0088C29.328 46.0088 32.0096 46.0104 34.1472 45.8071C36.3072 45.6018 38.0661 45.1767 39.6138 44.2283L38.0463 41.6704C37.0492 42.2814 35.8036 42.6361 33.8633 42.8206C31.9006 43.0072 29.3861 43.0088 25.8929 43.0088V46.0088ZM41.0448 38.6719C40.2959 39.894 39.2684 40.9215 38.0463 41.6704L39.6138 44.2283C41.2395 43.232 42.6064 41.8651 43.6027 40.2394L41.0448 38.6719ZM38.0463 11.3666C39.2684 12.1155 40.2959 13.143 41.0448 14.3651L43.6027 12.7976C42.6064 11.1719 41.2395 9.80497 39.6138 8.8087L38.0463 11.3666ZM19.5434 7.02822C16.1083 7.02822 13.4267 7.02664 11.289 7.22989C9.1291 7.43526 7.3702 7.86028 5.82252 8.8087L7.39002 11.3666C8.38711 10.7556 9.63265 10.4009 11.573 10.2164C13.5357 10.0298 16.0502 10.0282 19.5434 10.0282V7.02822ZM3.0531 26.5185C3.0531 23.0253 3.05468 20.5108 3.2413 18.5481C3.42579 16.6078 3.78048 15.3622 4.3915 14.3651L1.83358 12.7976C0.885158 14.3453 0.460134 16.1042 0.254765 18.2642C0.0515176 20.4018 0.0531002 23.0834 0.0531002 26.5185H3.0531ZM5.82252 8.8087C4.19675 9.80497 2.82985 11.1719 1.83358 12.7976L4.3915 14.3651C5.1404 13.143 6.16791 12.1155 7.39002 11.3666L5.82252 8.8087ZM18.5975 3.67871H29.9604V0.678711H18.5975V3.67871ZM29.9604 3.67871C31.79 3.67871 33.0051 3.68217 33.9082 3.80876C34.7616 3.92837 35.1113 4.13132 35.3438 4.37362L37.5088 2.29693C36.6318 1.38267 35.5341 1.00733 34.3246 0.837802C33.165 0.675254 31.7017 0.678711 29.9604 0.678711V3.67871ZM18.5975 0.678711C15.0816 0.678711 12.3192 0.676476 10.129 0.923859C7.90691 1.17485 6.09584 1.698 4.55071 2.86836L6.36209 5.25978C7.30605 4.54478 8.51486 4.12525 10.4657 3.9049C12.4485 3.68095 15.012 3.67871 18.5975 3.67871V0.678711ZM3.0531 19.9481C3.0531 16.2143 3.055 13.5296 3.27112 11.45C3.48469 9.39486 3.89386 8.1077 4.59217 7.10567L2.1309 5.39041C1.02077 6.98337 0.525727 8.84454 0.287189 11.1399C0.0512041 13.4106 0.0531002 16.2785 0.0531002 19.9481H3.0531ZM4.55071 2.86836C3.61982 3.57346 2.80369 4.42501 2.1309 5.39041L4.59217 7.10567C5.08748 6.39494 5.68522 5.77247 6.36209 5.25978L4.55071 2.86836ZM39.0336 8.79664C39.0266 7.36375 38.9959 6.12973 38.818 5.10913C38.6334 4.05038 38.2703 3.09086 37.5088 2.29693L35.3437 4.37362C35.5573 4.59625 35.7407 4.92558 35.8625 5.62431C35.991 6.3612 36.0265 7.35329 36.0337 8.81146L39.0336 8.79664ZM0.0531002 19.9481C0.0531002 22.0162 0.0104374 23.902 0.0536124 25.5007L3.05252 25.4198C3.01067 23.87 3.0531 22.1217 3.0531 19.9481H0.0531002ZM42.8249 29.444H30.4145V32.444H42.8249V29.444ZM23.1422 25.1717C23.1422 29.188 26.3981 32.444 30.4145 32.444V29.444C28.055 29.444 26.1422 27.5312 26.1422 25.1717H23.1422ZM26.1422 25.1717C26.1422 22.8122 28.055 20.8994 30.4145 20.8994V17.8994C26.3981 17.8994 23.1422 21.1553 23.1422 25.1717H26.1422ZM36.1868 23.6717H30.4145V26.6717H36.1868V23.6717ZM25.8929 10.0282C28.8224 10.0282 31.0696 10.0289 32.8902 10.1412C34.709 10.2534 35.9885 10.4726 37.0011 10.8571L38.0662 8.05257C36.6389 7.51051 35.0103 7.26632 33.0749 7.1469C31.1412 7.02758 28.788 7.02822 25.8929 7.02822V10.0282ZM37.0011 10.8571C37.3807 11.0013 37.7247 11.1696 38.0463 11.3666L39.6138 8.8087C39.1246 8.50892 38.6113 8.25957 38.0662 8.05257L37.0011 10.8571ZM36.0337 8.80405V9.45485H39.0337V8.80405H36.0337ZM30.4145 20.8994H43.7655V17.8994H30.4145V20.8994ZM45.3832 26.5185C45.3832 23.6084 45.3838 21.2457 45.2626 19.3058L42.2684 19.493C42.3825 21.3181 42.3832 23.5734 42.3832 26.5185H45.3832ZM45.2626 19.3058C45.0969 16.6545 44.6963 14.5822 43.6027 12.7976L41.0448 14.3651C41.7522 15.5195 42.1126 16.9992 42.2684 19.493L45.2626 19.3058ZM42.3832 26.5185C42.3832 28.1851 42.3831 29.635 42.3618 30.9191L45.3614 30.9689C45.3832 29.6548 45.3832 28.1779 45.3832 26.5185H42.3832ZM42.3618 30.9191C42.293 35.0625 41.9894 37.1304 41.0448 38.6719L43.6027 40.2394C45.0283 37.913 45.2936 35.051 45.3614 30.9689L42.3618 30.9191ZM42.8249 32.444H43.8616V29.444H42.8249V32.444Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex w-full font-bold text-2xl justify-center items-center scaling-specialists-heading mt-4">
                UNLEASH FINANCIAL POTENTIAL
              </div>
              <div className="flex w-[80%] justify-center content-center items-center scaling-specialists-paragraph">
                Stay updated on your scaling journey with regular progress
                reports.
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
