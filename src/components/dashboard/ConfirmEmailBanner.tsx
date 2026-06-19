import Container from "@/components/layout/Container";

/**
 * Cyan "confirm your email" reminder, mirroring the live LMS banner. Shown only
 * when a signed-in session's email is still unconfirmed.
 */
export default function ConfirmEmailBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="bg-[#00B0F0]">
      <Container className="py-3 text-center text-sm font-medium text-ink">
        Remember to confirm your email so that you can keep learning — open the
        confirmation link we sent (check your spam folder).
      </Container>
    </div>
  );
}
