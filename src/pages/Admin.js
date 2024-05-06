import React, { useEffect, useState } from 'react';
import {
    Card,
    Input,
    Button,
    Textarea,
    Typography,
    Spinner
} from "@material-tailwind/react";
import { generate_collection_description, generate_collection, check_endpoint_status } from '../api';

export default function Admin() {
    const [collectionDescription, setCollectionDescription] = useState("");
    const [collectionTitle, setCollectionTitle] = useState("");
    const [collectionLoading, setCollectionLoading] = useState(false);
    const [generatedCollection, setGeneratedCollection] = useState({});
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [collectionProgress, setCollectionProgress] = useState(0);
    const [collectionReady, setCollectionReady] = useState(false);

    const fetchCollectionDescription = async () => {
        setCollectionLoading(true);
        try {
            const response = await generate_collection_description(collectionTitle);
            setCollectionDescription(response.description);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setCollectionLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCollectionLoading(true);
        try {
            const response = await generate_collection(collectionTitle, collectionDescription);
            setGeneratedCollection(response);
            setCollectionLoading(false);
            setLoadingScreen(true);
            monitorCollectionStatus(response.id); // Adjust key based on actual response
        } catch (error) {
            console.error('Error generating collection:', error);
            setCollectionLoading(false);
        }
    };

    const monitorCollectionStatus = async (collectionId) => {
        let interval;
        const fetchStatus = async () => {
            try {
                const response = await check_endpoint_status(collectionId); // Adjust to your actual API
                const itemsCreated = response.items_processed; // Adjust key based on actual response
                setCollectionProgress(itemsCreated);
                if (itemsCreated >= 5) {
                    clearInterval(interval);
                    setLoadingScreen(false);
                    setCollectionReady(true);
                }
            } catch (error) {
                console.error('Error checking collection status:', error);
                clearInterval(interval);
            }
        };
        interval = setInterval(fetchStatus, 2000); // Check every 2 seconds
        await fetchStatus(); // Initial fetch to avoid delay
    };

    return (
        <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto justify-center items-center">
            {!loadingScreen && !collectionReady ? (
                <>
                    <Card color="transparent" shadow={false}>
                        <form className="mt-8 mb-2 w-8/12 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                            <div className="mb-1 flex flex-col gap-6">
                            <h1 className="text-center font-bold text-lg">Create Collection</h1>
                            <Typography color="gray" className="mt-1 font-normal">
                                Enter the details of the collection you want to create.
                            </Typography>
                                <Input
                                    size="lg"
                                    label='Collection Title'
                                    disabled={collectionLoading}
                                    value={collectionTitle}
                                    onChange={(e) => setCollectionTitle(e.target.value)}
                                />
                                <div className="flex items-center gap-3">
                                    <Textarea
                                        label='Collection Description'
                                        className='p-4'
                                        rows={10}
                                        value={collectionDescription}
                                        disabled={collectionLoading}
                                        onChange={(e) => setCollectionDescription(e.target.value)}
                                    />
                                    <Button
                                        size="sm"
                                        className="size-fit bg-brand"
                                        loading={collectionLoading}
                                        onClick={fetchCollectionDescription} // Trigger API call on click
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                            <Button
                                className="mt-6 bg-brand"
                                fullWidth
                                type="submit"
                                loading={collectionLoading}
                            >
                                Create Collection
                            </Button>
                        </form>
                    </Card>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <h1 className="text-center my-4">Generating Collection</h1>
                    <Typography color="gray" className="mt-1 font-normal">
                        {`Items Created: ${collectionProgress}/5`}
                    </Typography>
                    <Spinner color="blue" className="mt-8" />
                </div>
            )}
            {collectionReady && (
                <Button
                    className="mt-6 bg-brand"
                    onClick={() => window.open(`/collections/${generatedCollection.id}`, '_blank')}
                >
                    View Collection
                </Button>
            )}
        </div>
    );
}
