"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { session } from "@node_modules/next-auth/core/routes";

const EditPrompt = () => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState( false );
    const [prompt, setPrompt] = useState( {
        prompt: '',
        tag: ''
    } );

    const searchParams = useSearchParams();
    const promptId = searchParams.get( 'id' );

    useEffect( () => {
        const getPromptDetails = async () => {
            const response = await fetch( `/api/prompt/${ promptId }` );
            const data = await response.json();

            setPrompt( {
                prompt: data.prompt,
                tag: data.tag
            } );

        };

        if (promptId) getPromptDetails();
    }, [promptId] );

    // const createPrompt = async ( e ) => {
    //     e.preventDefault();
    //     setSubmitting( true );
    //
    //     try {
    //         const response = await fetch( '/api/prompt/new', {
    //             method: 'POST',
    //             body: JSON.stringify( {
    //                 prompt: prompt.prompt,
    //                 userId: session?.user.id,
    //                 tag: prompt.tag
    //             } )
    //         } );
    //
    //         if (response.ok) {
    //             router.push( '/' );
    //         }
    //
    //     } catch (e) {
    //
    //     } finally {
    //         setSubmitting( false );
    //     }
    // };

    return (
        <Form
            type="Create"
            prompt={ prompt }
            setPrompt={ setPrompt }
            submitting={ submitting }
            handleSubmit={ () => {
            } }
        />
    );
};

export default EditPrompt;