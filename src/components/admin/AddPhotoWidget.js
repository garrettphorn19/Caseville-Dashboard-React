// import React, { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import styled from "styled-components"

// // import Spinner from "./Spinner"

// const contentful = require("contentful-management")

// export default function AddPhotoWidget() {
//   const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY
//   const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID

//   const [photoAuthor, setAuthor] = useState(null)
//   const [photoDescription, setDescription] = useState(null)
//   const [selectedPhoto, setPhoto] = useState(null)
//   const [preview, setPreview] = useState()
//   const [isSubmitting, setSubmitting] = useState(false)

//   function authorChangedHandler(event) {
//     setAuthor(event.target.value)
//   }

//   function descriptionChangedHandler(event) {
//     setDescription(event.target.value)
//   }

//   function fileChangedHandler(event) {
//     setPhoto(event.target.files[0])
//   }

//   function handleSubmitClick() {
//     setSubmitting(true)

//     const client = contentful.createClient({
//       accessToken: managementAccessToken,
//     })

//     client
//       .getSpace(spaceId)
//       .then(space => space.getEnvironment("master"))
//       .then(environment =>
//         environment.createAssetFromFiles({
//           fields: {
//             title: {
//               "en-US": photoDescription,
//             },
//             description: {
//               "en-US": photoAuthor,
//             },
//             file: {
//               "en-US": {
//                 contentType: selectedPhoto.type,
//                 fileName: selectedPhoto.name,
//                 file: selectedPhoto,
//               },
//             },
//           },
//         })
//       )
//       .then(asset => asset.processForAllLocales())
//       .then(asset => asset.publish())
//       .catch(console.error)

//     setPhoto(null)

//     setTimeout(() => setSubmitting(false), 2000)
//   }

//   useEffect(() => {
//     if (!selectedPhoto) {
//       setPreview(undefined)
//       return
//     }

//     const objectUrl = URL.createObjectURL(selectedPhoto)
//     setPreview(objectUrl)

//     // free memory when ever this component is unmounted
//     return () => URL.revokeObjectURL(objectUrl)
//   }, [selectedPhoto])

//   return isSubmitting ? (
//     <Widget>
//       <Title>Add Photo</Title>
//       <ContentContainer>{/* <Spinner /> */}</ContentContainer>
//     </Widget>
//   ) : (
//     <Widget>
//       <Title>Add Photo</Title>
//       <ContentContainer>
//         <InputField>
//           <input
//             type="text"
//             placeholder="Author"
//             onChange={authorChangedHandler}
//           />
//         </InputField>
//         <InputField>
//           <input
//             type="text"
//             placeholder="Description"
//             onChange={descriptionChangedHandler}
//           />
//         </InputField>
//         <PhotoPreview>
//           <PreviewImage id="photoPreview" src={preview} />
//         </PhotoPreview>
//         <input
//           type="datetime-local"
//           name="eventTimeInput"
//           onChange={timeChangedHandler}
//           hidden
//         />
//         <ButtonContainer>
//           <AuthorContainer>
//             <InputField htmlFor="photoUpload">
//               <input
//                 type="text"
//                 placeholder="Author"
//                 onChange={authorChangedHandler}
//                 {...register("author", { required: true })}
//               />
//               {errors.author && <span>This field is required</span>}
//             </InputField>
//           </AuthorContainer>
//         </ButtonContainer>
//         <DescriptionContainer>
//           <InputField>
//             <input
//               type="text"
//               placeholder="Description"
//               onChange={descriptionChangedHandler}
//               {...register("description", { required: true })}
//             />
//             {errors.description && <span>This field is required</span>}
//           </InputField>
//         </DescriptionContainer>
//         <PhotoPreview>
//           <PreviewImage id="photoPreview" src={preview} />
//         </PhotoPreview>
//         <ButtonContainer>
//           <ChooseButton>
//             <label htmlFor="photoUpload">
//               <input
//                 accept="image/*"
//                 type="file"
//                 id="photoUpload"
//                 onChange={fileChangedHandler}
//               />
//               Choose Photo
//             </label>
//           </ChooseButton>
//           <SubmitButton type="submit" />
//         </ButtonContainer>
//       </ContentContainer>
//     </Widget>
//   )
// }

// const Widget = styled.div`
//   align-items: center;
//   background: linear-gradient(
//     180deg,
//     rgb(190.8, 86.06, 255) 0%,
//     rgb(93.54, 0, 150.87) 100%
//   );
//   border-radius: 25px;
//   box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
//     inset 0px 0px 0px 0.5px #ffffff80;
//   display: flex;
//   flex-direction: column;
//   height: 693px;
//   justify-content: space-between;
//   left: 0;
//   overflow: hidden;
//   padding: 20px 166px;
//   width: fit-content;

//   @media (max-width: 450px) {
//     width: 410px;
//   }
// `
// const Title = styled.p`
//   color: #ffffff;
//   font-family: "SF Pro Rounded-Bold", "Open Sans";
//   font-size: 48px;
//   font-weight: 700;
//   letter-spacing: 0;
//   line-height: normal;
//   margin-top: -1px;
//   position: relative;
//   text-align: center;
//   white-space: nowrap;
//   width: fit-content;
// `

// const ContentContainer = styled.div`
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   padding: 36px 50px;
//   position: relative;
//   width: fit-content;
// `

// const InputField = styled.div`
//   align-items: center;
//   display: flex;
//   gap: 10px;
//   justify-content: center;
//   position: relative;
//   width: fit-content;

//   input {
//     width: 486px;
//     height: 24px;
//     align-items: center;
//     background-color: #ffffff;
//     border: none;
//     border-radius: 25px;
//     box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
//       inset 0px 0px 0px 0.5px #ffffff80;
//     display: flex;
//     flex: 1;
//     gap: 10px;
//     overflow: hidden;
//     padding: 21px 15px;
//     position: relative;

//     @media (max-width: 450px) {
//       width: 310px;
//     }
//   }
// `

// const PhotoPreview = styled.div`
//   align-items: center;
//   display: flex;
//   gap: 10px;
//   justify-content: center;
//   position: relative;
//   width: fit-content;
//   border-radius: 25px;
//   background: #ffffff;
//   transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

//   &:hover {
//     transform: scale(1.05) translateY(-5px);
//     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
//       0px 20px 40px rgba(23, 0, 102, 0.2),
//       inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
//   }
// `

// const PreviewImage = styled.img`
//   background: transparent;
//   background-position: 50% 50%;
//   background-size: cover;
//   border-radius: 25px;
//   box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
//     inset 0px 0px 0px 0.5px #ffffff80;
//   flex: 1;
//   height: 288px;
//   max-width: 498px;
//   position: relative;
// `

// const ButtonContainer = styled.div`
//   align-items: flex-start;
//   display: flex;
//   gap: 10px;
//   position: relative;
//   width: fit-content;
// `

// const DescriptionContainer = styled.div`
//   align-items: flex-start;
//   display: flex;
//   gap: 10px;
//   position: relative;
//   width: fit-content;
// `

// const AuthorContainer = styled.div`
//   align-items: flex-start;
//   display: flex;
//   gap: 10px;
//   position: relative;
//   width: fit-content;
// `

// const ChooseButton = styled.div`
//   input[type="file"] {
//     display: none;
//   }

//   label {
//     color: #000000;
//     font-family: "SF Pro Rounded-Bold", "Open Sans";
//     font-size: 24px;
//     font-weight: 700;
//     text-align: center;

//     align-items: center;
//     background-color: #ffffff;
//     border-radius: 25px;
//     box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
//       inset 0px 0px 0px 0.5px #ffffff80;
//     display: inline-block;

//     gap: 20px;
//     justify-content: center;
//     overflow: hidden;
//     padding: 10px 20px;
//     position: relative;
//     width: fit-content;
//     transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

//     &:hover {
//       transform: scale(1.05) translateY(-5px);
//       box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
//         0px 20px 40px rgba(23, 0, 102, 0.2),
//         inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
//     }

//     &:active {
//       transform: scale(0.95) translateY(5px);
//       background: rgba(255, 255, 255, 0.5);
//       box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
//         0px 20px 40px rgba(23, 0, 102, 0.2),
//         inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
//     }
//   }
// `

// const SubmitButton = styled.input`
//   color: #000000;
//   font-family: "SF Pro Rounded-Bold", "Open Sans";
//   font-size: 24px;
//   font-weight: 700;
//   text-align: center;

//   align-items: center;
//   background-color: #ffffff;
//   border-radius: 25px;
//   box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
//     inset 0px 0px 0px 0.5px #ffffff80;
//   display: flex;
//   gap: 20px;
//   justify-content: center;
//   overflow: hidden;
//   padding: 10px 20px;
//   position: relative;
//   width: fit-content;
//   transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

//   &:hover {
//     transform: scale(1.05) translateY(-5px);
//     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
//       0px 20px 40px rgba(23, 0, 102, 0.2),
//       inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
//   }

//   &:active {
//     transform: scale(0.95) translateY(5px);
//     background: rgba(255, 255, 255, 0.5);
//     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
//       0px 20px 40px rgba(23, 0, 102, 0.2),
//       inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
//   }
// `
