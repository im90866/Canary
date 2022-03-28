import './Topbar.css'
import { useState, useEffect, useRef } from "react"

export default function Res({ searchRes }) {

    const listRef = useRef()
    const inputRef = useRef()

    return (
        <>
            <ul id="results" className="list-group" ref={listRef}>
                {
                    searchRes.length > 0
                        ?
                        searchRes.map((res, index) => {
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={(e) => {
                                        inputRef.current.value = res.username;
                                    }}
                                    className="list-group-item list-group-item-action"
                                >
                                    <img style={{ width: '30px', height: '25px' }} src={res.profilePictureID} />
                                    &nbsp;
                                    {res.username}
                                </button>
                            )
                        })
                        :
                        <button
                            type="button"
                            className="list-group-item list-group-item-action"
                        >
                            No Results Found
                        </button>
                }
            </ul>
        </>
    )
}