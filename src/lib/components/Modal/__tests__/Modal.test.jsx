import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../..';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalCloseButton } from '../ModalCloseButton';
import { ModalHeader } from '../ModalHeader';
import { ModalFooter } from '../ModalFooter';
import { ModalContent } from '../ModalContent';

describe('rendering', () => {
  it('renders with "portalId" props', () => {
    document.body.innerHTML = '<div id="portal-id" />';
    render((
      <Modal
        id="id"
        portalId="portal-id"
      >
        content
      </Modal>
    ));

    expect(screen.getByTestId('portal-id').firstChild.firstChild).toHaveAttribute('id', 'id');
    document.body.innerHTML = '';
  });

  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { position: 'top' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootPositionTop'),
    ],
    [
      { position: 'center' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootPositionCenter'),
    ],
    [
      { size: 'small' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeSmall'),
    ],
    [
      { size: 'medium' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeMedium'),
    ],
    [
      { size: 'large' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeLarge'),
    ],
    [
      { size: 'fullscreen' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeFullscreen'),
    ],
    [
      { size: 'auto' },
      (rootElement) => expect(within(rootElement).getByRole('presentation')).toHaveClass('isRootSizeAuto'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Modal
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('call close modal using `closeButtonRef` (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            label="Close"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    action();
    expect(spy.calledOnce).toEqual(true);
  });

  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('do not call close modal using `closeButtonRef` when button is disabled (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            disabled
            label="Close"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    action();
    expect(spy.called).toEqual(false);
  });

  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('call close modal using `closeButtonRef` and `ModalCloseButton` (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalHeader>
          <ModalCloseButton
            ref={ref}
            onClick={spy}
          />
        </ModalHeader>
      </Modal>
    ));

    action();
    expect(spy.calledOnce).toEqual(true);
  });

  it.each([
    () => userEvent.keyboard('{esc}'),
    () => userEvent.click(screen.getByTestId('id').parentNode),
  ])('do not call close modal using `closeButtonRef` and `ModalCloseButton` when button is disabled (%#)', (action) => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        closeButtonRef={ref}
        id="id"
      >
        <ModalHeader>
          <ModalCloseButton
            disabled
            ref={ref}
            onClick={spy}
          />
        </ModalHeader>
      </Modal>
    ));

    action();
    expect(spy.called).toEqual(false);
  });

  it('call primary action using `primaryButtonRef`', () => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        primaryButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            label="Submit"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    userEvent.keyboard('{enter}');
    expect(spy.calledOnce).toEqual(true);
  });

  it('do not call primary action using `primaryButtonRef when button is disabled', () => {
    const spy = sinon.spy();
    const ref = React.createRef();
    render((
      <Modal
        primaryButtonRef={ref}
        id="id"
      >
        <ModalFooter>
          <Button
            disabled
            label="Submit"
            onClick={spy}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    userEvent.keyboard('{enter}');
    expect(spy.called).toEqual(false);
  });

  const assertFocus = (element, shouldHaveFocus) => (
    shouldHaveFocus ? expect(element).toHaveFocus() : expect(element).not.toHaveFocus()
  );

  it.each([
    [
      <input />,
      (rootElement) => {
        const el = within(rootElement).getByRole('textbox');
        assertFocus(el, true);
      },
    ],
    [
      <textarea />,
      (rootElement) => {
        const el = within(rootElement).getByRole('textbox');
        assertFocus(el, true);
      },
    ],
    [
      (
        <select>
          <option>Option</option>
        </select>
      ),
      (rootElement) => {
        const el = within(rootElement).getByRole('combobox');
        assertFocus(el, true);
      },
    ],
    [
      (
        <>
          <input id="first" disabled />
          <input id="second" />
        </>
      ),
      (rootElement) => {
        const el = within(rootElement).getByTestId('second');
        assertFocus(el, true);
      },
    ],
  ])('autofocuses form field element (%#)', (child, assert) => {
    const ref = React.createRef();
    const dom = render((
      <Modal primaryButtonRef={ref}>
        <ModalBody>
          {child}
        </ModalBody>
        <ModalFooter>
          <Button
            disabled
            label="Submit"
            onClick={() => {}}
            ref={ref}
            type="button"
          />
        </ModalFooter>
      </Modal>
    ));

    assert(dom.container.firstChild);
  });

  it('autofocuses primary button if no form field is present', () => {
    const ref = React.createRef();
    const { container } = render((
      <Modal primaryButtonRef={ref}>
        <ModalFooter>
          <Button
            label="Submit"
            onClick={() => {}}
            ref={ref}
          />
        </ModalFooter>
      </Modal>
    ));

    const el = within(container.firstChild).getByRole('button');
    assertFocus(el, true);
  });

  it('autofocuses other focusable element if no input or primary button is present', () => {
    const ref = React.createRef();
    const { container } = render((
      <Modal closeButtonRef={ref}>
        <ModalBody>
          <a href="/" id="link">Link</a>
        </ModalBody>
        <ModalFooter>
          <Button
            label="button"
            ref={ref}
          />
        </ModalFooter>
      </Modal>
    ));

    const el = within(container.firstChild).getByRole('link');
    assertFocus(el, true);
  });

  it('focuses Modal itself if non focusable elements found', () => {
    const { container } = render((
      <>
        <Button label="button" id="button" />
        <Modal id="modal" />
      </>
    ));

    const el = within(container).getByTestId('modal');
    assertFocus(el, true);
  });

  it('focuses Modal itself if autoFocus is disabled', () => {
    const ref = React.createRef();

    const { container } = render((
      <Modal
        autoFocus={false}
        id="modal"
        primaryButtonRef={ref}
      >
        <ModalBody>
          <ModalContent>
            <input id="first" />
          </ModalContent>
        </ModalBody>
        <ModalFooter>
          <Button
            label="button"
            ref={ref}
          />
        </ModalFooter>
      </Modal>
    ));

    const el = within(container).getByTestId('modal');
    assertFocus(el, true);
  });

  it('traps focus', () => {
    const { container } = render((
      <Modal>
        <ModalBody>
          <ModalContent>
            <input id="first" />
            <input id="second" />
          </ModalContent>
        </ModalBody>
      </Modal>
    ));

    const firstEl = within(container).getByTestId('first');
    const secondEl = within(container).getByTestId('second');

    assertFocus(firstEl, true);
    userEvent.tab();
    assertFocus(secondEl, true);
    userEvent.tab();
    assertFocus(firstEl, true);
    userEvent.tab({ shift: true });
    assertFocus(secondEl, true);
  });

  it('prevents body from scrolling by default', () => {
    render((
      <Modal />
    ));

    expect(document.body).toHaveStyle('overflow: hidden');
  });

  it('does not prevent body from scrolling if disabled', () => {
    render((
      <Modal preventScrollUnderneath="off" />
    ));

    expect(document.body).not.toHaveStyle('overflow: hidden');
  });

  it('prevents scroll using custom function', async () => {
    const TestWrapper = () => {
      const [isModalOpened, setIsModalOpened] = React.useState(false);

      const customScrollPrevention = {
        reset: () => {
          document.getElementById('layout').style.overflow = 'auto';
        },
        start: () => {
          document.getElementById('layout').style.overflow = 'hidden';
        },
      };

      return (
        <div
          id="layout"
          style={{
            overflow: 'auto',
          }}
        >
          <Button label="button" id="button" onClick={() => setIsModalOpened(!isModalOpened)} />
          { isModalOpened && <Modal preventScrollUnderneath={customScrollPrevention} /> }
        </div>
      );
    };

    const { container } = render((
      <TestWrapper />
    ));

    const button = within(container).getByTestId('button');

    button.click();
    expect(within(container).getByTestId('layout')).toHaveStyle('overflow: hidden');

    button.click();
    expect(within(container).getByTestId('layout')).toHaveStyle('overflow: auto');
  });
});
