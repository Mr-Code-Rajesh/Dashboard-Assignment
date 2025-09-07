import { useEffect } from "react";

export default function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {

      // If click is inside the element, do nothing
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    }

    // Add event listeners
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
