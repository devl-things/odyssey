import React, { useEffect, useState } from 'react';
import { OdysseyNodeProps } from '../../data/odyssey-protocol/OdysseyData';
import { PiImageBrokenDuotone } from "react-icons/pi";

const NodeIcon: React.FC<OdysseyNodeProps> = ({ data }) => {
    const [imgError, setImgError] = useState(false);
    useEffect(() => {
        setImgError(false);
    }, [data.icon]);

    return (
        <>
            {data.icon && (
                <div className='node-icon'>
                    {!imgError ? (
                        <img
                            src={data.icon}
                            alt={data.name}
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <PiImageBrokenDuotone size={50} />
                    )}
                </div>
            )
            }
        </>
    );
};

export default NodeIcon;