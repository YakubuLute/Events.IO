import React from 'react';
import { CustomDialog, SuccessPrompt } from '@/components/shared';
import { ContactSupportModal } from './ContactSupport/ContactSupportModal';

type Props = {
  contactSupport: boolean;
  onCloseSupport: () => void;
};

const ContactSupportModals = ({
  contactSupport,
  onCloseSupport,
}: Props) => {
  const [success, setSuccess] = React.useState(false);


  return (
    <>
      <CustomDialog
        title="Contact Support"
        onClose={onCloseSupport}
        open={contactSupport}
      >
        <ContactSupportModal
          open={contactSupport}
          onClose={onCloseSupport}
          onOpen={() => setSuccess(true)}
        // setSuccess={setSuccess}
        />
      </CustomDialog>

      <SuccessPrompt
        onClose={() => setSuccess(false)}
        open={success}
        title="Thank You! Your query has been successfully submitted."
        description="Our customer support team will respond to your inquiry shortly."
        btnText="Great"
      />
    </>
  );
};

export default ContactSupportModals;
