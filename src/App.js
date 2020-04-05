import React from 'react';
import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
  from {
    width: 200px;
    background: orange;
  }

  to {
    width: 50px;
  }
`;

const H1 = styled.h1`
    animation: ${rotate} 2s linear;
    
    transition: all 2s;
    
    &:hover {
      transform: translate(200px);
    }
`;

function AnimationCallbacks(
  {
    animatedElement,
    renderAnimatedElement,
    onAnimationStarted,
    onAnimationEnded,
    onTransitionStarted,
    onTransitionEnded
  }) {

  React.useEffect(() => {
    animatedElement.current.addEventListener('animationstart', onAnimationStarted);
    animatedElement.current.addEventListener('animationend', onAnimationEnded);

    animatedElement.current.addEventListener('transitionstart', onTransitionStarted);
    animatedElement.current.addEventListener('transitionend', onTransitionEnded);
  }, [animatedElement, onAnimationEnded, onAnimationStarted, onTransitionEnded, onTransitionStarted]);

  return renderAnimatedElement();
}

function App() {
  const ref = React.useRef();

  return (
    <div>
      <AnimationCallbacks
        onTransitionStarted={() => {
          console.log('onTransitionStarted');
        }}
        onTransitionEnded={() => {
          console.log('onTransitionEnded');
        }}
        onAnimationStarted={() => {
          console.log('onAnimationStarted')
        }}
        onAnimationEnded={() => {
          console.log('onAnimationEnded')
        }}
        renderAnimatedElement={() => {
          return (
            <H1
              ref={ref}>
              abc
            </H1>
          );
        }}
        animatedElement={ref}
      />
    </div>
  );
}

export default App;
