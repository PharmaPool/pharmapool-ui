import React, { useContext } from "react";
import { ValueContext } from "../../../Context";

function WalletItem({ wallet }) {
  const { setAdminWalletId } = useContext(ValueContext);
  return (
    <div className="user_item" onClick={() => setAdminWalletId(wallet._id)}>
      <p>{wallet.walletAddress}</p>
    </div>
  );
}

export default WalletItem;
