interface VSCodeLogoProps {
  size?: number;
}

// Renders the actual VS Code icon supplied for this project, served
// from /public/favicon.svg — the same file used for the browser tab
// icon, so the titlebar mark and the favicon always stay in sync.
export default function VSCodeLogo({ size = 22 }: VSCodeLogoProps) {
  return (
    <img
      src="/favicon.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  );
}
