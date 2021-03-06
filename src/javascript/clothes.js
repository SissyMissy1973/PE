window.daringValues={
	daringUnderwearNone: 6,
	daringUnderwearFemale: 3,
	daringClothesFemale: 5,
	daringCollar: 5,
	daringCollarSlutty: 8,
	daringHairband: 5,
	daringExtra: 5
}

window.clothes={
	setCage: function() {
		if (State.active.variables.kink.penisShrinkProgress >= 1) {
			State.active.variables.items.chastityDevice.name="CB-6000S chastity device";
			State.active.variables.items.chastityDevice.image="chastity_cb6000s.jpg";
		}
	},
	checkUnderwear: function() {
		var player=State.active.variables.player;
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		if (player.daring < window.daringValues.daringUnderwearFemale) {
			return u && !u.female;
		} else if (player.daring < window.daringValues.daringUnderwearNone) {
			return u;
		} else {
			return true;
		}
	},
	dressedGuardian: {
		reason: '',
		check: function() {
			var player=State.active.variables.player;
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			var s=playerCode.isWearingOn(itemTypes.Shoes);
			var u=playerCode.isWearingOn(itemTypes.Underwear);
			var br=playerCode.isWearingOn(itemTypes.Bras);
			var st=playerCode.isWearingOn(itemTypes.Stockings);
			var co=playerCode.isWearingOn(itemTypes.Collar);
			var hb=playerCode.isWearingOn(itemTypes.Hairband);
			var ea=playerCode.isWearingOn(itemTypes.Earrings);
			var ex=playerCode.isWearingOn(itemTypes.Extra);
			if (!o && u && u.female && player.perversion.guardian <= 3) {
				State.active.variables.reason="You don't feel comforable enough to do that wearing female underwear";
				return false;
			}
			if (!o && br && br.female && player.perversion.guardian <= 3) {
				State.active.variables.reason="You don't feel comforable enough to do that wearing a bra";
				return false;
			}
			if (!o && st && st.female && player.perversion.guardian <= 3) {
				State.active.variables.reason="You don't feel comforable enough to do that wearing feminine socks";
				if (st.slutty) {
					State.active.variables.reason="You don't feel comforable enough to do that wearing stockings";
				}
				return false;
			}
			if (co && player.perversion.guardian <= 3) {
				State.active.variables.reason="You don't feel comforable enough to do that while wearing choker";
				if (co.slutty) {
					State.active.variables.reason="You don't feel comforable enough to do that while wearing collar";
				}
				if (co.daringRec >=  8) {
					State.active.variables.reason="You don't feel comforable enough to do that while wearing such collar";
				}
				return false;
			}
			if (hb && player.perversion.guardian <= 3) {
				State.active.variables.reason="You don't feel comforable enough to do that while wearing feminine hair acessorry";
				return false;
			}
			if (ex && player.perversion.guardian <= 3) {
				State.active.variables.reason="You don't feel comforable enough to do that while wearing extra acessorry";
				return false;
			}
			if (!o && player.perversion.guardian <= 4) {
				State.active.variables.reason="You don't feel comforable enough to do that without clothes";
				return false;
			}
			if (!o && !u && player.perversion.guardian <= 4) {
				State.active.variables.reason="You don't feel comforable enough to do that naked";
				return false;
			}
			if (((o && o.female) || (s && s.female)) && (player.perversion.guardian <= 2)) {
				State.active.variables.reason="You don't feel comforable enough to do that wearing female clothing";
				return false;
			}
			return true;
		}
	},
	dressedGuardianWork: {
		reason: '',
		check: function() {
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			if (o && o.school) {
				State.active.variables.reason="Clinic policy forbids wearing a school uniform on a part time job";
				return false;
			}
			return true;
		}
	},
	dressedWhore: {
		reason: '',
		check: function() {
			var u=playerCode.isWearingOn(itemTypes.Underwear);
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			var s=playerCode.isWearingOn(itemTypes.Shoes);
			if (u) {
				State.active.variables.reason="You don't need underwear for that";
				return false;
			}
			if (!o) {
				State.active.variables.reason="You need to wear something";
				return false;
			}
			if (!s) {
				State.active.variables.reason="You need to wear shoes";
				return false;
			}
			if (!o.slutty || !s.slutty) {
				State.active.variables.reason="You're not dressed slutty enough";
				return false;
			}
			if (o.sleepWear) {
				State.active.variables.reason="You can't wear sleepwear for that";
				return false;
			}
			return true;
		}
	},
	dressedOutside: {
		reason: '',
		check: function(mode) {
			var player=State.active.variables.player;
			var u=playerCode.isWearingOn(itemTypes.Underwear);
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			var s=playerCode.isWearingOn(itemTypes.Shoes);
			var br=playerCode.isWearingOn(itemTypes.Bras);
			var st=playerCode.isWearingOn(itemTypes.Stockings);
			var co=playerCode.isWearingOn(itemTypes.Collar);
			var hb=playerCode.isWearingOn(itemTypes.Hairband);
			var ea=playerCode.isWearingOn(itemTypes.Earrings);
			var ex=playerCode.isWearingOn(itemTypes.Extra);
			if (mode == 1 && player.flags.exhausted) {
				State.active.variables.reason="You are too exhausted to do that";
				return false;
			}
			if (o.sleepWear) {
				State.active.variables.reason="You can't wear sleepwear outside";
				return false;
			}
			if (!o) {
				State.active.variables.reason="You have to wear clothing outside";
				return false;
			}
			if (!s) {
				State.active.variables.reason="You have to wear shoes outside";
				return false;
			}
			if (o && o.daringRec == 13) {
				State.active.variables.reason="You can't go out wearing a maid uniform";
				return false;
			}
			if (s && s.daringRec == 13) {
				State.active.variables.reason="You can't go out wearing ballet heels";
				return false;
			}
			if (!window.clothes.checkUnderwear()) {
				State.active.variables.reason="You don't feel daring enough to do this " + (u ? "in that underwear" : "without underwear on");
				return false;
			}
			if (br && (player.daring < window.daringValues.daringUnderwearFemale)) {
				State.active.variables.reason="You don't feel daring enough to go out wearing a bra";
				return false;
			}
			if (st && (player.daring < window.daringValues.daringUnderwearFemale)) {
				State.active.variables.reason="You don't feel daring enough to go out wearing feminine socks";
				if (st.slutty) {
					State.active.variables.reason="You don't feel daring enough to go out wearing stockings";
				}
				return false;
			}
			if (co && !co.slutty && (player.daring < window.daringValues.daringCollar)) {
				State.active.variables.reason="You don't feel daring enough to go out while wearing choker";
				return false;
			}
			if (co && co.slutty && (player.daring < co.daringRec) && !player.flags.collarLocked) {
				State.active.variables.reason="You don't feel daring enough to go out while wearing such collar";
				return false;
			}
			if (hb && (player.daring < window.daringValues.daringHairband)) {
				State.active.variables.reason="You don't feel daring enough to go out while wearing feminine hair acessorry";
				return false;
			}
			if (ex && (player.daring < window.daringValues.daringExtra)) {
				State.active.variables.reason="You don't feel daring enough to go out while wearing extra acessorry";
				return false;
			}
			if ((player.daring < window.daringValues.daringClothesFemale) || (player.perversion.crossdressing < 6 && player.perversion.teacher < 4 && State.active.variables.tasksTeacher.wearDressToSchool.status <= 0)) {
				if (o.female || s.female) {
					State.active.variables.reason="You don't feel daring enough to do this in female clothing";
					return false;
				}
			}
			if (player.flags.laundryAccident && u && u.female && playerCode.owns(itemsC.jocksLucky)) {
				State.active.variables.reason="You don't want to go outside in wet underwear";
				return false;
			}
			return true;
		}
	},
	dressedFriend: {
		reason: '',
		check: function() {
			var u=playerCode.isWearingOn(itemTypes.Underwear);
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			var s=playerCode.isWearingOn(itemTypes.Shoes);
			if (!window.clothes.checkUnderwear()) {
				State.active.variables.reason="You don't feel daring enough for " + (u ? "that" : "no") + " underwear";
				return false;
			}
			if (o.sleepWear) {
				State.active.variables.reason="You can't wear sleepwear outside";
				return false;
			}
			if (!s) {
				State.active.variables.reason="You have to wear shoes outside";
				return false;
			}
			if (!o) {
				State.active.variables.reason="You have to wear clothing outside";
				return false;
			}
			if (State.active.variables.player.daring < window.daringValues.daringClothesFemale) {
				if (o.female || s.female) {
					State.active.variables.reason="You don't feel daring enough to face your friend while wearing female clothing";
					return false;
				}
			}
			return true;
		}
	},
	dressedTherapy: {
		reason: '',
		check: function() {
			var player=State.active.variables.player;
			if (!window.clothes.dressedOutside.check(1)) {
				return false;
			}
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			var s=playerCode.isWearingOn(itemTypes.Shoes);
			if ((o.female || s.female) && (player.perversion.therapist < 3) && (player.perversion.guardian < 5)) {
				State.active.variables.reason="You don't feel ready to visit $therapist dressed like that";
				return false;
			}
			return true;
		}
	},
	dressedSchool: {
		reason: '',
		check: function() {
			var player=State.active.variables.player;
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			var s=playerCode.isWearingOn(itemTypes.Shoes);
			var st=playerCode.isWearingOn(itemTypes.Stockings);
			var co=playerCode.isWearingOn(itemTypes.Collar);
			var hb=playerCode.isWearingOn(itemTypes.Hairband);
			var ea=playerCode.isWearingOn(itemTypes.Earrings);
			var ex=playerCode.isWearingOn(itemTypes.Extra);
			if (!window.clothes.dressedOutside.check(0)) {
				return false;
			}
			if (!o.school) {
				State.active.variables.reason="You need to wear the school uniform";
				return false;
			}
			if (!s.school) {
				State.active.variables.reason="You need to wear proper footwear";
				return false;
			}
			if (o.school && !o.female && s.female && s.slutty) {
				State.active.variables.reason="It is against rules to wear heels with pants";
				return false;
			}
			if (player.perversion.teacher < 8) {
				if (st && st.schoolAlt && (st.schoolAlt < st.curAlt)) {
					State.active.variables.reason="Such stockings are against school uniform regulations, I need plain black stockings";
					if (!st.slutty) {
						State.active.variables.reason="Such socks are against school uniform regulations, I need plain black socks";
					}
					return false;
				}
				if (hb && hb.schoolAlt && (hb.schoolAlt < hb.curAlt)) {
					State.active.variables.reason="Such hairband is against school uniform regulations";
					return false;
				}
				if (s && s.schoolAlt && (s.schoolAlt < s.curAlt) && (s.curAlt != 40)) {
					State.active.variables.reason="Such style of shoes is against school uniform regulations, I need more conservative looking model";
					return false;
				}
				if (s && (s.daringRec >= 7)) {
					State.active.variables.reason="Such heeled shoes are against school uniform regulations";
					return false;
				}
			}
			return true;
		}
	},
	dressedSleep: {
		reason: '',
		check: function() {
			var player=State.active.variables.player;
			var o=playerCode.isWearingOn(itemTypes.Outerwear);
			var s=playerCode.isWearingOn(itemTypes.Shoes);
			if (s) {
				State.active.variables.reason="You can't wear shoes to bed";
				return false;
			}
			if (o) {
				if (!o.sleepWear) {
					State.active.variables.reason="You have to wear sleepwear to sleep";
					return false;
				}
				if ((player.daring < window.daringValues.daringUnderwearFemale) && o.female) {
					State.active.variables.reason="You don't feel daring enough";
					return false;
				}
			}
			return true;
		}
	},
	dressedMaid: {
		reason: '',
		check: function() {
			var o=playerCode.isWearing(itemsC.maidOutfit);
			if (!o) {
				State.active.variables.reason="You have to wear the maid outfit for this";
				return false;
			}
			return true;
		}
	},
	dressedFemale: function() {
		var u=playerCode.isWearingOn(itemTypes.Underwear);
		var o=playerCode.isWearingOn(itemTypes.Outerwear);
		var s=playerCode.isWearingOn(itemTypes.Shoes);
		return (!u || u.female) && o.female && s.female;	
	}
}