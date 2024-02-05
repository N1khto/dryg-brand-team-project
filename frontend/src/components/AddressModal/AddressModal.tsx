// import React, { useContext, useEffect } from 'react';
// import './AddressModal.scss';
// import { CITIES, NP_BRANCHES, OBLASTS } from '../../contants/delivery';
// import { updateUserAddress } from '../../api/user';
// import { Address } from '../../types/User';
// import { AuthContext } from '../../context/AuthContext';
// import { Loader } from '../Loader';
// import classNames from 'classnames';
// import { Field, Formik, FormikHelpers } from 'formik';
// import CustomSelect from '../CustomSelect/CustomSelect';
// import ModalWrapper from '../ModalWrapper/ModalWrapper';

// interface Props {
//   onClose: (value: boolean) => void;
// }

// interface FormValues {
//   phone_number: string;
//   region: string;
//   city: string;  
//   nova_post_department: number;
// }

// const AddressModal: React.FC<Props> = React.memo(({ onClose }) => {
//   const { setAuthUser, authUser} = useContext(AuthContext);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "unset";
//     }
//   }, []);

//   const initialValues: FormValues = {
//     phone_number: authUser ? authUser.phone_number : '',
//     city: authUser ? authUser.city : '',
//     region: authUser ? authUser.region : '',
//     nova_post_department: authUser? authUser.nova_post_department : 0,
//   };

//   const handleSubmitAddress = (values: FormValues, action: FormikHelpers<FormValues>) => {

//   const address: Address = {
//     region: values.region,
//     city: values.city,
//     nova_post_department: values.nova_post_department,
//     phone_number: values.phone_number,
//   }

//   updateUserAddress(address)
//     .then(() => {
//       if (authUser) {
//         const updatedUser = {
//           ...authUser,
//           region: values.region,
//           city: values.city,
//           nova_post_department: values.nova_post_department,
//           phone_number: values.phone_number,
//         }
//         setAuthUser(updatedUser);
//         onClose(false);
//       }
//     })
//     .catch((e) => {
//       console.log(e)
//     })
//     .finally(() => {
//       action.setSubmitting(false)
//     })    
//   } 

//   return (
//     <div className="AddressModal">
//       <div className="AddressModal__header">
//         <h2 className="AddressModal__title">Add address</h2>
//         <button
//           type="button"
//           className="AddressModal__button"
//           onClick={() => onClose(false)}
//         >
//           <div className="icon icon--close" />
//         </button>
//       </div>

//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmitAddress}
//         enableReinitialize={true}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//         }) => (
//           <form onSubmit={handleSubmit} className="Form AccountDetailsPage__form">
//             <div className="Form__container">
//               <Field
//                 type="tel"
//                 name="phone_number"
//                 placeholder={values.phone_number || 'Add Phone'}
//                 className={classNames('Form__field', {
//                   'is-error': errors.phone_number && touched.phone_number
//                 })}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.phone_number}
//               />
//               {errors.phone_number && touched.phone_number && (
//                 <div className="Form__error-message">{errors.phone_number}</div>
//               )}
//             </div>

//             <div className="Form__container">                
//               <Field
//                 name="region"
//                 options={OBLASTS}
//                 component={CustomSelect}
//                 placeholder="Select the oblast"
//               />
//             </div>

//             <div className="Form__container">                
//               <Field
//                 name="city"
//                 options={CITIES[values.region]}
//                 component={CustomSelect}
//                 placeholder="Select the city"
//                 isDisabled={values.region === ''}
//               />
//             </div>

//             <div className="Form__container">                
//               <Field
//                 name="nova_post_department"
//                 options={NP_BRANCHES}
//                 component={CustomSelect}
//                 placeholder="Select the branch of Nova Poshta"
//                 isDisabled={values.city === ''}
//               />
//             </div>

//             <button 
//               type="submit" 
//               disabled={isSubmitting}
//               className="Form__button"
//             >
//               {isSubmitting ? (
//                 <Loader />
//               ) : (
//                 'add address'
//               )}
//             </button>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// });

// export default ModalWrapper(AddressModal);

export {}