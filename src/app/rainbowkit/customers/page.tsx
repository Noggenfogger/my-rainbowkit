import { OpenModal } from "@/src/components/rainbowkit/open-modal";
import { CustomConnectButton } from "@/src/components/rainbowkit/custom-connectbutton";

export default function Page() {
  return (
    <>
      <h2>模态钩子</h2>
      <OpenModal />
      <h2>自定义连接按钮</h2>
      <CustomConnectButton />
    </>
  );
}
