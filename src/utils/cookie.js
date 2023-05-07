import { useState, useEffect } from "react"
import cookie from 'react-cookies';

export const useCookieEntry = (name, initVal) => {
    const [content, setContent] = useState(initVal);
    const value = cookie.load(name);
    useEffect(() => {
        if (value) {
            setContent(value);
        } else {
            cookie.save(name, initVal);
        }
    }, []);
    const updateContent = (value) => {
        setContent(value);
        cookie.save(name, value);
    }
    return [content, updateContent]
}
