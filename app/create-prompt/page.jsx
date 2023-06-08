"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { session } from "@node_modules/next-auth/core/routes";

const CreatePrompt = () => {

    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState( false );
    const [prompt, setPrompt] = useState( {
        prompt: '',
        tag: ''
    } );

    const createPrompt = async ( e ) => {
        e.preventDefault();
        setSubmitting( true );

        try {
            const response = await fetch( '/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify( {
                    prompt: prompt.prompt,
                    userId: session?.user.id,
                    tag: prompt.tag
                } )
            } );

            if (response.ok) {
                router.push( '/' );
            }

        } catch (e) {

        } finally {
            setSubmitting( false );
        }
    };

    return (
        <Form
            type="Create"
            prompt={ prompt }
            setPrompt={ setPrompt }
            submitting={ submitting }
            handleSubmit={ createPrompt }
        />
    );
};

export default CreatePrompt;