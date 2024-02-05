import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getWarehouses } from "../../api/novaPost";
import { updateUserAddress } from "../../api/user";
import { Address } from "../../types/User";
import { Loader } from "../Loader";
import classNames from "classnames";

interface Props {
  setWarehouse: (warehouse: '') => void;
  cityRef: string,
}

export const WarehouseField: React.FC<Props> = ({ setWarehouse, cityRef }) => {
  const { setAuthUser, authUser} = useContext(AuthContext);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (cityRef) {
      setIsSubmitting(true);

      getWarehouses(cityRef)
        .then(resp => resp.json())
        .then(data => {
          setPosts(data.data);
          console.log(data.data)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    }
    
  }, [cityRef])

  const handleSelect = (post: any) => {
    setIsSelectOpen(false);
    setIsSubmitting(true);
    setWarehouse(post.Description)

    const address: Address = {
      city: authUser?.city || '',
      nova_post_department: post.Description,
      phone_number: authUser?.phone_number || '',
    }

    updateUserAddress(address)
    .then(() => {
      if (authUser) {
        const updatedUser = {
          ...authUser,
          nova_post_department: post.Description,          
        }
        setAuthUser(updatedUser);
      }
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      setIsSubmitting(false);
    })
  }

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (
      event.relatedTarget
      && event.relatedTarget?.className.includes('select-option')
    ) {
      return;
    }

    setIsSelectOpen(false);
  };

  return (
    <div className="LocationField">
      <button 
        className="LocationField__triger"
        type="button" 
        onBlur={(e) => handleBlur(e)} 
        onClick={() => setIsSelectOpen(prev => !prev)}
      >
        {isSubmitting ? <Loader /> : (
          <>
            <span>
              {authUser?.nova_post_department 
                ? `${authUser.nova_post_department}`          
                : 'Select the branch of Nova Poshta'}
            </span>
            <div className={classNames('LocationField__icon icon icon--arrow-down', {
              icon__rotate: isSelectOpen,
            })}/>
          </>
        )}

                
      </button>

      {isSelectOpen && (
        <div className="LocationField__select">
          <ul className="LocationField__select-list">
            {!!posts.length ? 
              posts.map((post) => (
                <li key={post.Ref}>
                  <button
                    type="button"
                    onClick={() => handleSelect(post)}
                    className="LocationField__select-option"                
                  >
                    {post.Description}
                  </button>
                </li>
            )) : (
              <p className="LocationField__select-option">
                No Options
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};