import { useState } from "react";
import { UserTypes } from "@/@types/shared/type";
import { CustomButton } from "@/components/shared";
import { FeedbackIcon } from "@/components/shared/SVG-components";
import { GiveFeedbackModal } from "./give-feedback-modal/GiveFeedbackModal";
import SuccessPrompt from "@/components/shared/prompt-dialog/SuccessPrompt";

import { useGetCurrentUserBasicInfo } from "@/hooks/shared";
import { SxProps, useMediaQuery } from "@mui/material";

type Props = {
  userType?: UserTypes;
  sx?: SxProps

}

const FeedbackButton: React.FC<Props> = ({ sx }) => {
  const isMobile = useMediaQuery('(max-width:1280px)');
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: userBasicInfo } = useGetCurrentUserBasicInfo();

  return (
    <>
      {!userBasicInfo?.hasGivenFeedback && (
        <CustomButton
          label="Give Feedback"
          buttonClass="feedback_btn"
          onClick={() => setOpenFeedbackModal(true)}
          startIcon={!isMobile && <FeedbackIcon height={25} />}
          sx={sx}
        />
      )}

      <GiveFeedbackModal
        open={openFeedbackModal}
        onClose={() => setOpenFeedbackModal(false)}
        setSuccess={setSuccess}
      />
      <SuccessPrompt
        onClose={() => setSuccess(false)}
        open={success}
        title="Thank You! Your feedback has been submitted successfully."
        description="Feel free to reach out to us anytime using our support form for any additional feedback or suggestions you may have. We're here to listen and assist!"
      />
    </>
  )
}

export default FeedbackButton;
