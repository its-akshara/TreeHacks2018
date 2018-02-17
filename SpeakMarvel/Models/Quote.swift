//
//  Quote.swift
//  SpeakMarvel
//
//  Created by Akshara Sundararajan on 2/17/18.
//  Copyright © 2018 meera. All rights reserved.
//

import Foundation

class Quote{
    var quote: String
    var difficulty: Float
    var character: String
    var imageURL: URL
    
    init(quote: String, difficulty: Float, character: String, imageURL: URL){
        self.character = character
        self.difficulty = difficulty
        self.quote = quote
        self.imageURL = imageURL
    }
    
    enum Difficulty
    {
        case EASY, MEDIUM, HARD
    }
    
    
    func getDifficulty(word: String) -> Difficulty
    {
        if word.count < 6 {
            return Difficulty.EASY
        }
        else if word.contains("qu") || word.contains("rct")
        {
            
        }
        return Difficulty.MEDIUM
    }
    
    func numberOfMediumWords(quote:String) -> Int
    {
        
        return 0
    }
    
    func numberOfDifficultWords(quote: String) -> Int
    {
        
        return 0;
    }
    
    func calculateDifficulty(quote: String) -> Float
    {
        var rawScore: Float
        rawScore = 0
        return rawScore
    }
    
    init(quote: String, character: String, imageURL: URL){
        self.character = character
        self.difficulty = 0
        self.quote = quote
        self.imageURL = imageURL
        self.difficulty = calculateDifficulty(quote: quote)

    }
    
    func removePunctuation(word: String) -> String
    {
        var newWord = word.replacingOccurrences(of:".", with: "")
        newWord = newWord.replacingOccurrences(of:"?", with: "")
        newWord = newWord.replacingOccurrences(of:",", with: "")
        newWord = newWord.replacingOccurrences(of:"!", with: "")
        newWord = newWord.replacingOccurrences(of:"(", with: "")
        newWord = newWord.replacingOccurrences(of:")", with: "")
        
        return newWord
    }
    
    func checkQuoteSaidIsCorrect(spokenQuote: String) -> Bool
    {
        var normalizedSpokenQuote: String
        var normalizedQuote: String
        normalizedQuote = quote.lowercased()
        normalizedSpokenQuote = spokenQuote.lowercased()
        
        //need to remove punctuation from actual quote
        
        normalizedQuote = removePunctuation(word:normalizedQuote)
        normalizedSpokenQuote = removePunctuation(word:normalizedSpokenQuote)
        
        return normalizedSpokenQuote == normalizedQuote
        
    }
    
    
}

