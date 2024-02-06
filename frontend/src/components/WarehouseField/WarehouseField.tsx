import React, { useEffect, useState } from "react";
import { getWarehouses } from "../../api/novaPost";
import { Loader } from "../Loader";
import classNames from "classnames";

interface Props {
  setWarehouse: (warehouse: string) => void;
  cityRef: string,
  warehouse: string,
  error?: string,
  setError?: (error: string) => void,
}

export const WarehouseField: React.FC<Props> = ({ 
  setWarehouse, 
  cityRef, 
  warehouse, 
  error, 
  setError = () => {} 
}) => {
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
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    }
    
  }, [cityRef])

  const handleSelect = (post: any) => {
    setIsSelectOpen(false);
    setWarehouse(post.Description);
    setError('');
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
        className={classNames("LocationField__triger", {
          'is-error': error?.length,
        })}
        type="button" 
        onBlur={(e) => handleBlur(e)} 
        onClick={() => setIsSelectOpen(prev => !prev)}
      >
        {isSubmitting && <Loader />}  
        {!isSubmitting && (
          <>
            {warehouse ? (
              <span>{warehouse}</span>
            ) : (
              <span className="LocationField__placeholder">
                Select the branch of Nova Poshta
              </span>
            )}
            <div className={classNames('icon icon--arrow-down-grey', {
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