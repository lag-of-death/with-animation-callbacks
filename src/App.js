import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";

const timeout = 1000;

const rotate = keyframes`
  from {
    width: 200px;
    background: orange;
  }

  to {
    width: 50px;
  }
`;

const complexMixin = css`
  &.alert-enter {
    opacity: 0;
    transform: scale(0.3);
  }
  
  &.alert-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity ${timeout}ms, transform ${timeout}ms;
  }
  
  &.alert-exit {
    opacity: 1;
  }
  
  &.alert-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity ${timeout}ms, transform ${timeout}ms;
  }
`;

const Image2 = styled.div`
  color: chocolate;

  ${complexMixin}
`;

const Image = styled.div`
  height: 30px;
  width: 100px;
  border: 1px solid orange;

  ${complexMixin}
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
    const current = animatedElement.current;
    
    current.addEventListener('animationstart', onAnimationStarted);
    current.addEventListener('animationend', onAnimationEnded);

    current.addEventListener('transitionstart', onTransitionStarted);
    current.addEventListener('transitionend', onTransitionEnded);
    
    return () => {
      current.removeEventListener('animationstart', onAnimationStarted);
      current.removeEventListener('animationend', onAnimationEnded);

      current.removeEventListener('transitionstart', onTransitionStarted);
      current.removeEventListener('transitionend', onTransitionEnded);
    }
  }, []);

  return renderAnimatedElement();
}

function App() {
  const ref = React.useRef();

  const [showMessage, setShowMessage] = React.useState(false);
  const [items, setItems] = React.useState([1,2,3,4,5]);
  const [switchState, setSwitchState] = React.useState(true);

  const modes = ["out-in", "in-out"];
  const mode = modes[0];
  
  return (
    <div>
      <h1>CSSTransition</h1>

      <CSSTransition
        in={showMessage}
        timeout={timeout}
        classNames="alert"
        unmountOnExit
        onEnter={() => console.log('enter')}
        onExited={() => console.log('exit')}
      >
        <Image>
          abc
        </Image>
      </CSSTransition>

      <button onClick={() => { setShowMessage((prev) => !prev )}}>
        toggle
      </button>
      
      <hr/>

      <h1>TransitionGroup</h1>

      <TransitionGroup className="todo-list">
        {items.map((num) => (
          <CSSTransition
            key={num}
            timeout={timeout}
            classNames="alert"
            onEnter={() => console.log('enter')}
            onExited={() => console.log('exit')}
          >
            <Image onClick={() => {
              setItems((prev) => {
                return prev.filter((number) => {
                  return number !== num
                })
              })
            }}>
              {num}
            </Image>
          </CSSTransition>
          ))}
      </TransitionGroup>


      <button onClick={() => {
        setItems((prev) => {
          const itemsWithout1 = prev.filter((number) => {
            return number !== 1
          });

          return itemsWithout1.concat(Math.random())
        })
      }}>add and remove simultaneously</button>

      <button onClick={() => {
        setItems((prev) => {
          return prev.concat(Math.random())
        })
      }}>add</button>


      <hr/>

      <h1>SwitchTransition</h1>


      <SwitchTransition mode={mode}>
        <CSSTransition
          key={switchState}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="alert"
        >
          {switchState ? <Image>abc</Image> : <Image2>xyz</Image2>}
        </CSSTransition>
      </SwitchTransition>

      <button onClick={() => {
        setSwitchState(state => !state);
      }}>ble</button>

      <hr/>

      <h1>AnimationCallbacks</h1>

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
