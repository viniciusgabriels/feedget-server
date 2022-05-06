import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },    
  { sendMail: sendMailSpy }    
)

describe('Submit feedback', () => {
  it('should submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a bug',
      screenshot: 'data:image/png;base64,687146874687'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith();
    expect(sendMailSpy).toHaveBeenCalledWith();
  })
  
  it('should not submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'This is a bug',
      screenshot: 'data:image/png;base64,687146874687'
    })).rejects.toThrow();
  })

  it('should not submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,687146874687'
    })).rejects.toThrow();
  })

  it('should not submit a feedback with an invalid screenshot format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This is a bug',
      screenshot: 'photo.jpg'
    })).rejects.toThrow();
  })

});