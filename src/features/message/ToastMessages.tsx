// import { Toast } from "flowbite-react";
// import { BsCheckLg } from "react-icons/bs";
// import { useAppSelector } from "../../app/hooks";

// const dangerBg = "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
// const successBg =
//   "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
// const infoBg =
//   "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";

// export const ToastMessages = () => {
//   const messages = useAppSelector((state) => state.messages);
//   return (
//     <div className="flex flex-col gap-1 fixed top-28 right-10">
//       {messages.length > 0 &&
//         messages.map((message) => {
//           const bgColor: string =
//             message.type === "danger"
//               ? dangerBg
//               : message.type === "success"
//               ? successBg
//               : infoBg;
//           return (
//             <Toast key={message.id}>
//               <div
//                 className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgColor}`}
//               >
//                 <span>
//                   <BsCheckLg />
//                 </span>
//               </div>
//               <div className="ml-2 text-md font-normal mr-4">
//                 {message.content}
//               </div>
//               <Toast.Toggle />
//             </Toast>
//           );
//         })}
//     </div>
//   );
// };
