// export const loadLine = async () => {
//   await import("@line/liff").then((liff) => {
//     liff
//       .init({ liffId: "1657785397-LVBe6BkX" })
//       .then(async () => {
//         if (liff.isLoggedIn()) {
//           console.log("login");
//           const profile = await liff
//             .getProfile()
//             .then((profile: { userId: SetStateAction<undefined> }) => {
//               setLine(profile.userId);
//             });
//         } else {
//           // liff.login();
//           console.log("not login");
//         }
//       })
//       .catch(() => {
//         console.log("error");
//       });
//     // lib is error
//   });
// };
