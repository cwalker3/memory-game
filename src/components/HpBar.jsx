import { useState, useEffect } from 'react';

function HpBar({health}) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (health < 3) {
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, 500)
    }
  }, [health])

  return (
    <div className={`HpBar ${flash ? 'red' : ''}`}>HP: {health}</div>
  )
}

export default HpBar;