import { Fragment, useState } from "react";
import { Button } from "@material-ui/core";
type EventHandler = () => void;

interface IProps {
    charLimit: number;
    expanded: boolean;
    readMoreText: string;
    readLessText: string;
    onClick: EventHandler
    children: string;
}

const ReadMoreLess = ({ charLimit, expanded, readMoreText, readLessText, onClick, children }: IProps) => {

    return (
        <Fragment>
            {children.length <= charLimit ?
                (children)
                : (
                    (expanded) ? (
                        <>
                            {children}
                            <Button
                                size="small"
                                variant="text"
                                color="secondary"
                                onClick={onClick}
                            >
                                {readLessText}
                            </Button>
                        </>
                    ) : (
                        <>
                            {children.slice(0, charLimit) + '...'}
                            <Button
                                size="small"
                                variant="text"
                                color="primary"
                                onClick={onClick}
                            >
                                {readMoreText}
                            </Button>
                        </>
                    )
                )
            }
        </Fragment >
    );
}

export default ReadMoreLess;