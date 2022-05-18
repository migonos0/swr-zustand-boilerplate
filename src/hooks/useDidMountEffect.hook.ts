// custom hook that only runs on second render and further
// https://stackoverflow.com/questions/53253940/make-react-useeffect-hook-not-run-on-initial-render

import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

export function useDidMountEffect(
    effect: EffectCallback,
    deps?: DependencyList | undefined
): void {
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) effect();
        else didMount.current = true;
    }, deps);
}
