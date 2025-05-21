import '@testing-library/jest-dom';

import { act, cleanup, render, screen } from '@testing-library/react';
import { ChatControls } from '../ChatControls.js';
import { Provider } from 'react-redux';

describe('ChatControls', () => {

    const mockStore = {
        getState: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    const renderComponent = () => {    
        // render in a mock store    
        return render(
            <Provider store={mockStore}>
                <ChatControls />
            </Provider>
        );
    };

    it('should render in a separate container', () => {
        // arrange and act
        renderComponent();
        const container = screen.getByTestId('chat-controls');
    
        // assert
        expect(container).toBeInTheDocument();
    });

    it('should render a button that starts a new conversation', () => {
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        renderComponent();

        const button = screen.getByTestId('new-conversation-button');
        act(() => {
            button.click();
        });

        expect(button).toBeInTheDocument();
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });
});
