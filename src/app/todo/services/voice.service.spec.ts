/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VoiceService } from './voice.service';

describe('Service: VoiceRecognition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoiceService]
    });
  });

  it('should ...', inject([VoiceService], (service: VoiceService) => {
    expect(service).toBeTruthy();
  }));
});
