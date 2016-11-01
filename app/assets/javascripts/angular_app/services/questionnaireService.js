angular.module('rentals').service('questionnaireService', function() {
  return {
    getQuestionnaire: getQuestionnaire
  };

  /* --- Private --- */

  function getQuestionnaire() {
    var questions = {
      reasonOwnerIsSelling: {
        prompt: 'Why do the owners want to sell?',
        name: 'reason-owner-is-selling',
        field: 'reasonOwnerIsSelling'
      },
      currentMarketRent: {
        prompt: 'What is the current market rent for this type of property?',
        name: 'current-market-rent',
        field: 'currentMarketRent'
      },
      isAllWorkPermitted: {
        prompt: 'Has all work done on the property been permitted?',
        name: 'is-all-work-permitted',
        field: 'isAllWorkPermitted'
      },
      isThePropertyInAFloodZone: {
        prompt: 'Is the property in a known flood zone?',
        name: 'is-the-property-in-a-flood-zone',
        field: 'isThePropertyInAFloodZone'
      },
      areThereAnyCovenantsOrCaveats: {
        prompt: 'Are there any covenants, caveats or any regulatory impositions on the property?',
        name: 'are-there-any-covenants-or-caveats',
        field: 'areThereAnyCovenantsOrCaveats'
      },
      whatDefectsOrImperfectionsExist: {
        prompt: 'What defects or imperfections exist?',
        name: 'what-defects-or-imperfections-exist',
        field: 'whatDefectsOrImperfectionsExist'
      },
      whatIsTheZoning: {
        prompt: 'What is the zoning of the property? What is the potential for this zoning to change?',
        name: 'what-is-the-zoning',
        field: 'whatIsTheZoning'
      },
      whatFixturesAndFittingsWillGoWithTheSale: {
        prompt: 'What fixtures and fittings are part of the purchase and what aren’t?',
        name: 'what-fixtures-and-fittings-will-go-with-the-sale',
        field: 'whatFixturesAndFittingsWillGoWithTheSale'
      },
      isTheFoundationStillStructurallySound: {
        prompt: 'Is the foundation still structurally sound?',
        name: 'is-the-foundation-still-structurally-sound',
        field: 'isTheFoundationStillStructurallySound'
      },
      howIsTheRoof: {
        prompt: 'How old is the roof and what condition is it in?',
        name: 'how-is-the-roof',
        field: 'howIsTheRoof'
      },
      areThereWiringOrPlumbingIssues: {
        prompt: 'Are there known wiring or plumbing issues?',
        name: 'are-there-wiring-or-plumbing-issues',
        field: 'areThereWiringOrPlumbingIssues'
      },
      isThereNearbyRetailAndEntertainment: {
        prompt: 'Is the property near major shopping centres, cafes, restaurants and so on?',
        name: 'is-there-nearby-retail-and-entertainment',
        field: 'isThereNearbyRetailAndEntertainment'
      },
      haveThereBeenAnyOffers: {
        prompt: 'Have there been any offers?',
        name: 'have-there-been-any-offers',
        field: 'haveThereBeenAnyOffers'
      },
      areThereSealantOrMoistureProblems: {
        prompt: 'Does the property have any known sealant or moisture problems?',
        name: 'are-there-sealant-or-moisture-problems',
        field: 'areThereSealantOrMoistureProblems'
      },
      areThereSignsOfCoveredDamage: {
        prompt: 'Are there signs of internal or external damage that has been covered over?',
        name: 'are-there-signs-of-covered-damage',
        field: 'areThereSignsOfCoveredDamage'
      },
      isWorkNeededInTheShortTerm: {
        prompt: 'Is there potential work that may need doing in the short to medium term?',
        name: 'is-work-needed-in-the-short-term',
        field: 'isWorkNeededInTheShortTerm'
      },
      willATitleSearchRevealSurprises: {
        prompt: 'Will a title search reveal something that will affect the purchase?',
        name: 'will-a-title-search-reveal-surprises',
        field: 'willATitleSearchRevealSurprises'
      },
      doesThePropertyMatchWhatIsOnTheTitle: {
        prompt: 'Do the actual physical property and the dwellings on it match what is delineated on the Certificate of Title?',
        name: 'does-the-property-match-what-is-on-the-title',
        field: 'doesThePropertyMatchWhatIsOnTheTitle'
      },
      whenWasTheLastAppraisal: {
        prompt: 'When was the last appraisal?',
        name: 'when-was-the-last-appraisal',
        field: 'whenWasTheLastAppraisal'
      },
      hasTheOwnerPreviouslyTriedToSell: {
        prompt: 'Has the owner previously tried to sell the property?',
        name: 'has-the-owner-previously-tried-to-sell',
        field: 'hasTheOwnerPreviouslyTriedToSell'
      },
      howMotivatedIsTheSeller: {
        prompt: 'How motivated is the seller?',
        name: 'how-motivated-is-the-seller',
        field: 'howMotivatedIsTheSeller'
      },
      hasAnotherBuyerFailedToCloseDueToFinancing: {
        prompt: 'Has another buyer failed to close due to financing?',
        name: 'has-another-buyer-failed-to-close-due-to-financing',
        field: 'hasAnotherBuyerFailedToCloseDueToFinancing'
      },
      positiveAttributesOfTheProperty: {
        prompt: 'What are the positive attributes of the property?',
        name: 'positive-attributes-of-the-property',
        field: 'positiveAttributesOfTheProperty'
      },
      negativeAttributesOfTheProperty: {
        prompt: 'What are the negative attributes of the property?',
        name: 'negative-attributes-of-the-property',
        field: 'negativeAttributesOfTheProperty'
      },
      howToMakeMoneyOnThisProperty: {
        prompt: 'How can money be made off this property?',
        name: 'how-to-make-money-on-this-property',
        field: 'howToMakeMoneyOnThisProperty'
      },
      whoSetThePrice: {
        prompt: 'Who set the price, the seller or the agent?',
        name: 'who-set-the-price',
        field: 'whoSetThePrice'
      },
      qualityOfFinishesAndFittings: {
        prompt: 'What is the quality of the finishes and fittings?',
        name: 'quality-of-finishes-and-fittings',
        field: 'qualityOfFinishesAndFittings'
      },
      isPropertyUnderLease: {
        prompt: 'Is the property under lease?',
        name: 'is-property-under-lease',
        field: 'isPropertyUnderLease'
      },
      howIsSurroundingProperty: {
        prompt: 'What is the surrounding property like?',
        name: 'how-is-surrounding-property',
        field: 'howIsSurroundingProperty'
      },
      isFurnitureEtcIncluded: {
        prompt: 'Is any furniture etc being sold with the property?',
        name: 'is-furniture-etc-included',
        field: 'isFurnitureEtcIncluded'
      },
      howManyOwners: {
        prompt: 'How many owners has the property had since it was built?',
        name: 'how-many-owners',
        field: 'howManyOwners'
      }
    };

    return [
      questions.reasonOwnerIsSelling,
      questions.currentMarketRent,
      questions.isAllWorkPermitted,
      questions.isThePropertyInAFloodZone,
      questions.areThereAnyCovenantsOrCaveats,
      questions.whatDefectsOrImperfectionsExist,
      questions.whatIsTheZoning,
      questions.whatFixturesAndFittingsWillGoWithTheSale,
      questions.isTheFoundationStillStructurallySound,
      questions.howIsTheRoof,
      questions.areThereWiringOrPlumbingIssues,
      questions.isThereNearbyRetailAndEntertainment,
      questions.haveThereBeenAnyOffers,
      questions.areThereSealantOrMoistureProblems,
      questions.areThereSignsOfCoveredDamage,
      questions.isWorkNeededInTheShortTerm,
      questions.willATitleSearchRevealSurprises,
      questions.doesThePropertyMatchWhatIsOnTheTitle,
      questions.whenWasTheLastAppraisal,
      questions.hasTheOwnerPreviouslyTriedToSell,
      questions.howMotivatedIsTheSeller,
      questions.hasAnotherBuyerFailedToCloseDueToFinancing,
      questions.positiveAttributesOfTheProperty,
      questions.negativeAttributesOfTheProperty,
      questions.howToMakeMoneyOnThisProperty,
      questions.whoSetThePrice,
      questions.qualityOfFinishesAndFittings,
      questions.isPropertyUnderLease,
      questions.howIsSurroundingProperty,
      questions.isFurnitureEtcIncluded,
      questions.howManyOwners
    ];
  }
});
