<script lang="ts">
	import { DataEntry } from "../../api/data/dataset.svelte";
	import BugIcon from "../icons/BugIcon.svelte";
	import DiceIcon from "../icons/DiceIcon.svelte";
	import GraphIcon from "../icons/GraphIcon.svelte";
	import IOIcon from "../icons/IOIcon.svelte";
	import LicenseIcon from "../icons/LicenseIcon.svelte";
	import PackageIcon from "../icons/PackageIcon.svelte";
	import PageIcon from "../icons/PageIcon.svelte";
	import ParagraphIcon from "../icons/ParagraphIcon.svelte";
	import PencilIcon from "../icons/PencilIcon.svelte";
	import PersonIcon from "../icons/PersonIcon.svelte";
	import PlugIcon from "../icons/PlugIcon.svelte";
	import PrivacyIcon from "../icons/PrivacyIcon.svelte";
	import RulerIcon from "../icons/RulerIcon.svelte";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import SproutIcon from "../icons/SproutIcon.svelte";
	import TreeIcon from "../icons/TreeIcon.svelte";
	import VersionControlIcon from "../icons/VersionControlIcon.svelte";
	import HierarchyView from "../views/HierarchyView.svelte";
	import Popup from "./Popup.svelte";
	import icon from "../../assets/images/icon.png";

	let popup: Popup;

	let view = $state("introduction");

	export function open(viewName?: string) {
		if (viewName) view = viewName;
		popup.open();
	}

	function reset() {}

	function setView(viewName: string) {
		return function () {
			view = viewName;
		};
	}
</script>

<Popup {reset} bind:this={popup}>
	<div class="popup">
		<div class="sidebar">
			<h1 class="title">
				<img src={icon} alt="wallflower" />
				Wallflower Manual
			</h1>
			<h1>The essentials</h1>

			<button onmousedown={setView("introduction")}>
				<SproutIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Introduction</span>
			</button>
			<button onmousedown={setView("interface")}>
				<TreeIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Interface</span>
			</button>
			<button onmousedown={setView("datasets")}>
				<SpreadsheetIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Datasets</span>
			</button>
			<button onmousedown={setView("templates")}>
				<PackageIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Templates</span>
			</button>
			<button>
				<GraphIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Views</span>
			</button>
			<button>
				<PencilIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>The Editor</span>
			</button>
			<button>
				<PageIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Manuscript</span>
			</button>

			<h1>Advanced</h1>

			<button>
				<RulerIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Measurements &amp; Units</span>
			</button>
			<button>
				<DiceIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Randomization</span>
			</button>
			<button>
				<IOIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Generated Datasets</span>
			</button>
			<button>
				<ParagraphIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Suggestions</span>
			</button>
			<button>
				<PlugIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Plugins</span>
			</button>

			<h1>Development</h1>

			<button>
				<PlugIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Plugin Development</span>
			</button>
			<button>
				<BugIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Bug Reporting</span>
			</button>
			<button>
				<VersionControlIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Contributing</span>
			</button>

			<h1>Legal</h1>
			<button onmousedown={setView("license")}>
				<LicenseIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>License</span>
			</button>
			<button>
				<PrivacyIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Privacy Policy</span>
			</button>
		</div>
		<div class="content">
			{#if view === "introduction"}
				<h1>Introduction</h1>

				<p>Welcome to Wallflower!</p>

				<p>
					Wallflower is a data editor designed for novel writing. Wallflower lets you keep track of your characters, scenes,
					locations, and more, and visualize how they all connect to one another. You can write scenes independently in their own
					documents, and automatically join them all into a full manuscript. Additionally, Wallflower comes with a bunch of little
					utilities for novel writing&mdash;name generators, structure templates, randomizers, location mapping, and more.
				</p>

				<p>
					Technically, Wallflower can be used to hold any kind of data&mdash;not just novels. That being said, it's designed for
					long-form novel writing, and works best as a tool for that.
				</p>
				<p>
					Wallflower has always been and will always be a <i>completely free tool.</i>
					Writing is beautiful, and I refuse to be exploitative or predatory in an artisic industry that's already overly bureaucratized.
				</p>

				<div class="nav-buttons">
					<button class="next">Next</button>
				</div>
			{:else if view === "interface"}
				<h1>Interface</h1>

				<p>
					Wallflower is divided into <i>panes.</i>
					You can think of a pane like a window&mdash; It's its own little workspace with tabs and settings. Panes are divided into
					multiple
					<i>tabs</i>
					. Each tab holds one dataset or editor&mdash;don't worry about those right now, we'll talk more about that later. Panes can
					be infinitely split horizontally or vertically into more panes.
				</p>
			{:else if view === "datasets"}
				<h1>Datasets</h1>

				<p>
					The heart of Wallflower projects are <i>datasets.</i>
					Datasets are, well, sets of data. You can think of it as a list of things. For example, most standard Wallflower projects
					will have datasets for characters, plot events, and locations.
				</p>

				<p>
					Datasets are represented as a <i>tree.</i>
					This just means that your items can be grouped together, and your groups can be grouped together, and those groups can be
					grouped together, and&mdash;well, you get the point. This helps keep things organized. For example, lets say we have a Characters
					dataset. We might make separate groups for main characters and side characters. Within our side characters group, we might
					have separate groups for different friend groups. That might look something like this:
				</p>

				<!-- <div class="tree">
					<HierarchyView
						demo
						tree={DataEntry.node("Characters", [
							DataEntry.node("Main Characters", [DataEntry.node("Harry"), DataEntry.node("Hermione"), DataEntry.node("Ron")]),
							DataEntry.node("Side Characters", [
								DataEntry.node("Professors", [DataEntry.node("Dumbledore"), DataEntry.node("Snape")]),
								DataEntry.node("Students", [DataEntry.node("Seamus"), DataEntry.node("Neville"), DataEntry.node("Draco")]),
							]),
						])}
						LeafIcon={PersonIcon}
					/>
				</div> -->

				<p>
					This is called the <i>hierarchy view.</i>
					We'll talk more about views in the next section, but they're basically just different ways of displaying the same data.
				</p>

				<p>
					There's a lot of datasets you'll find yourself using over and over&mdash;characters, events, locations, etc. To assist
					with this, Wallflower comes with <i>templates</i>
					that have prebuilt dataset outlines. You can also create and save your own templates with your personal workflows. We'll talk
					more about templates later.
				</p>

				<h1>Attributes &amp; Entries</h1>

				<p>
					Datasets hold <i>entries.</i>
					An entry is just a thing in the dataset. For example, in our characters dataset, "Harry", "Ron", and "Snape" are all entries.
					"Main Characters" and "Professors", for example, are
					<i>not</i>
					entries&mdash;they're groups. The difference is that entries hold data attached to them called
					<i>attributes</i>
					. For example, our characters might each have a set hair color, height, weight, and eye color, but "Professors", of course,
					wouldn't.
				</p>

				<p>
					Groups <i>can</i>
					have attributes if you want, though. This is handy for things like locations, where you might have locations
					<i>inside</i>
					other locations, and so the "groups" themselves should be entries.
				</p>

				<p>
					<i>Attributes</i>
					are where all of your actual data lives. Your characters physical appearances, location information, and even your actual
					prose will all be stored as attributes.
				</p>

				<p>
					Generally you'll be editing your attributes in the <i>spreadsheet view.</i>
					One notable exception to this is any long text data with formatting like bold and italics, which can be edited in the
					<i>editor</i>
					panel. This is where your actual writing will take place.
				</p>
			{:else if view === "license"}
				<h1>License</h1>

				<p>
					The Wallflower project is FOSS and licensed under the <i>Attribution-NonCommercial-ShareAlike 4.0 International</i>
					license. The TL;DR is, you can copy, redistribute, and modify the code as much as you'd like, as long as it's:
				</p>

				<ul>
					<li>
						<b>Attributed</b>
						- You must link to the original project
					</li>
					<li>
						<b>Non-Commercial</b>
						- You cannot use any form of this code for profit or commercial gain, including modified and old versions.
					</li>
					<li>
						<b>Share-Alike</b>
						- Any versions, adaptations, or redistributions you release of the project's code
						<b>must be licensed under this same license.</b>
					</li>
				</ul>

				<p>
					That's pretty much it. I'd like to think it's mostly common sense&mdash;credit me, don't sell my work, and don't let
					others sell your work. Wallflower was designed to be a free community tool for all to use, and I will not see it made
					predatory.
				</p>

				<p>The full license spec is below.</p>

				<h2>Attribution-NonCommercial-ShareAlike 4.0 International</h2>

				<p>
					Creative Commons Corporation ("Creative Commons") is not a law firm and does not provide legal services or legal advice.
					Distribution of Creative Commons public licenses does not create a lawyer-client or other relationship. Creative Commons
					makes its licenses and related information available on an "as-is" basis. Creative Commons gives no warranties regarding
					its licenses, any material licensed under their terms and conditions, or any related information. Creative Commons
					disclaims all liability for damages resulting from their use to the fullest extent possible.
				</p>

				<p>Using Creative Commons Public Licenses</p>

				<p>
					Creative Commons public licenses provide a standard set of terms and conditions that creators and other rights holders
					may use to share original works of authorship and other material subject to copyright and certain other rights specified
					in the public license below. The following considerations are for informational purposes only, are not exhaustive, and
					do not form part of our licenses.
				</p>

				<p class="indent">
					Considerations for licensors: Our public licenses are intended for use by those authorized to give the public permission
					to use material in ways otherwise restricted by copyright and certain other rights. Our licenses are irrevocable.
					Licensors should read and understand the terms and conditions of the license they choose before applying it. Licensors
					should also secure all rights necessary before applying our licenses so that the public can reuse the material as
					expected. Licensors should clearly mark any material not subject to the license. This includes other CC- licensed
					material, or material used under an exception or limitation to copyright. More considerations for licensors:
					wiki.creativecommons.org/Considerations_for_licensors
				</p>

				<p class="indent">
					Considerations for the public: By using one of our public licenses, a licensor grants the public permission to use the
					licensed material under specified terms and conditions. If the licensor's permission is not necessary for any
					reason--for example, because of any applicable exception or limitation to copyright--then that use is not regulated by
					the license. Our licenses grant only permissions under copyright and certain other rights that a licensor has authority
					to grant. Use of the licensed material may still be restricted for other reasons, including because others have
					copyright or other rights in the material. A licensor may make special requests, such as asking that all changes be
					marked or described. Although not required by our licenses, you are encouraged to respect those requests where
					reasonable. More considerations for the public: wiki.creativecommons.org/Considerations_for_licensees
				</p>

				<hr />

				<h1>Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License</h1>

				<p>
					By exercising the Licensed Rights (defined below), You accept and agree to be bound by the terms and conditions of this
					Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License ("Public License"). To the extent
					this Public License may be interpreted as a contract, You are granted the Licensed Rights in consideration of Your
					acceptance of these terms and conditions, and the Licensor grants You such rights in consideration of benefits the
					Licensor receives from making the Licensed Material available under these terms and conditions.
				</p>

				<h2>Section 1 - Definitions.</h2>

				<ol type="a">
					<li>
						<p>
							Adapted Material means material subject to Copyright and Similar Rights that is derived from or based upon the
							Licensed Material and in which the Licensed Material is translated, altered, arranged, transformed, or otherwise
							modified in a manner requiring permission under the Copyright and Similar Rights held by the Licensor. For purposes
							of this Public License, where the Licensed Material is a musical work, performance, or sound recording, Adapted
							Material is always produced where the Licensed Material is synched in timed relation with a moving image.
						</p>
					</li>

					<li>
						<p>
							Adapter's License means the license You apply to Your Copyright and Similar Rights in Your contributions to Adapted
							Material in accordance with the terms and conditions of this Public License.
						</p>
					</li>

					<li>
						<p>
							BY-NC-SA Compatible License means a license listed at creativecommons.org/compatiblelicenses, approved by Creative
							Commons as essentially the equivalent of this Public License.
						</p>
					</li>

					<li>
						<p>
							Copyright and Similar Rights means copyright and/or similar rights closely related to copyright including, without
							limitation, performance, broadcast, sound recording, and Sui Generis Database Rights, without regard to how the
							rights are labeled or categorized. For purposes of this Public License, the rights specified in Section 2(b)(1)-(2)
							are not Copyright and Similar Rights.
						</p>
					</li>

					<li>
						<p>
							Effective Technological Measures means those measures that, in the absence of proper authority, may not be
							circumvented under laws fulfilling obligations under Article 11 of the WIPO Copyright Treaty adopted on December 20,
							1996, and/or similar international agreements.
						</p>
					</li>

					<li>
						<p>
							Exceptions and Limitations means fair use, fair dealing, and/or any other exception or limitation to Copyright and
							Similar Rights that applies to Your use of the Licensed Material.
						</p>
					</li>

					<li>
						<p>
							License Elements means the license attributes listed in the name of a Creative Commons Public License. The License
							Elements of this Public License are Attribution, NonCommercial, and ShareAlike.
						</p>
					</li>

					<li>
						<p>
							Licensed Material means the artistic or literary work, database, or other material to which the Licensor applied
							this Public License.
						</p>
					</li>

					<li>
						<p>
							Licensed Rights means the rights granted to You subject to the terms and conditions of this Public License, which
							are limited to all Copyright and Similar Rights that apply to Your use of the Licensed Material and that the
							Licensor has authority to license.
						</p>
					</li>

					<li><p>Licensor means the individual(s) or entity(ies) granting rights under this Public License.</p></li>

					<li>
						<p>
							NonCommercial means not primarily intended for or directed towards commercial advantage or monetary compensation.
							For purposes of this Public License, the exchange of the Licensed Material for other material subject to Copyright
							and Similar Rights by digital file-sharing or similar means is NonCommercial provided there is no payment of
							monetary compensation in connection with the exchange.
						</p>
					</li>

					<li>
						<p>
							Share means to provide material to the public by any means or process that requires permission under the Licensed
							Rights, such as reproduction, public display, public performance, distribution, dissemination, communication, or
							importation, and to make material available to the public including in ways that members of the public may access
							the material from a place and at a time individually chosen by them.
						</p>
					</li>

					<li>
						<p>
							Sui Generis Database Rights means rights other than copyright resulting from Directive 96/9/EC of the European
							Parliament and of the Council of 11 March 1996 on the legal protection of databases, as amended and/or succeeded, as
							well as other essentially equivalent rights anywhere in the world.
						</p>
					</li>

					<li>
						<p>
							You means the individual or entity exercising the Licensed Rights under this Public License. Your has a
							corresponding meaning.
						</p>
					</li>
				</ol>

				<h2>Section 2 - Scope.</h2>

				<ol type="a">
					<li>
						<p>a. License grant.</p>

						<ol>
							<li>
								<p>
									1. Subject to the terms and conditions of this Public License, the Licensor hereby grants You a worldwide,
									royalty-free, non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights in the
									Licensed Material to:
								</p>

								<ol type="a">
									<li>
										<p>a. reproduce and Share the Licensed Material, in whole or in part, for NonCommercial purposes only; and</p>
									</li>

									<li><p>b. produce, reproduce, and Share Adapted Material for NonCommercial purposes only.</p></li>
								</ol>
							</li>
							<li>
								<p>
									2. Exceptions and Limitations. For the avoidance of doubt, where Exceptions and Limitations apply to Your use,
									this Public License does not apply, and You do not need to comply with its terms and conditions.
								</p>
							</li>

							<li><p>3. Term. The term of this Public License is specified in Section 6(a).</p></li>

							<li>
								<p>
									4. Media and formats; technical modifications allowed. The Licensor authorizes You to exercise the Licensed
									Rights in all media and formats whether now known or hereafter created, and to make technical modifications
									necessary to do so. The Licensor waives and/or agrees not to assert any right or authority to forbid You from
									making technical modifications necessary to exercise the Licensed Rights, including technical modifications
									necessary to circumvent Effective Technological Measures. For purposes of this Public License, simply making
									modifications authorized by this Section 2(a) (4) never produces Adapted Material.
								</p>
							</li>

							<li>
								<p>5. Downstream recipients.</p>

								<ol type="a">
									<li>
										<p>
											a. Offer from the Licensor -- Licensed Material. Every recipient of the Licensed Material automatically
											receives an offer from the Licensor to exercise the Licensed Rights under the terms and conditions of this
											Public License.
										</p>
									</li>

									<li>
										<p>
											b. Additional offer from the Licensor -- Adapted Material. Every recipient of Adapted Material from You
											automatically receives an offer from the Licensor to exercise the Licensed Rights in the Adapted Material
											under the conditions of the Adapter's License You apply.
										</p>
									</li>

									<li>
										<p>
											c. No downstream restrictions. You may not offer or impose any additional or different terms or conditions
											on, or apply any Effective Technological Measures to, the Licensed Material if doing so restricts exercise
											of the Licensed Rights by any recipient of the Licensed Material.
										</p>
									</li>
								</ol>
							</li>

							<li>
								<p>
									6. No endorsement. Nothing in this Public License constitutes or may be construed as permission to assert or
									imply that You are, or that Your use of the Licensed Material is, connected with, or sponsored, endorsed, or
									granted official status by, the Licensor or others designated to receive attribution as provided in Section
									3(a)(1)(A)(i).
								</p>
							</li>

							<li>
								<p>b. Other rights.</p>

								<ol>
									<li>
										<p>
											1. Moral rights, such as the right of integrity, are not licensed under this Public License, nor are
											publicity, privacy, and/or other similar personality rights; however, to the extent possible, the Licensor
											waives and/or agrees not to assert any such rights held by the Licensor to the limited extent necessary to
											allow You to exercise the Licensed Rights, but not otherwise.
										</p>
									</li>

									<li><p>2. Patent and trademark rights are not licensed under this Public License.</p></li>

									<li>
										<p>
											3. To the extent possible, the Licensor waives any right to collect royalties from You for the exercise of
											the Licensed Rights, whether directly or through a collecting society under any voluntary or waivable
											statutory or compulsory licensing scheme. In all other cases the Licensor expressly reserves any right to
											collect such royalties, including when the Licensed Material is used other than for NonCommercial purposes.
										</p>
									</li>
								</ol>
							</li>
						</ol>

						<h2>Section 3 - License Conditions.</h2>

						<p>Your exercise of the Licensed Rights is expressly made subject to the following conditions.</p>

						<ol type="a">
							<li>
								<p>Attribution.</p>

								<ol>
									<li>
										<p>1. If You Share the Licensed Material (including in modified form), You must:</p>

										<ol type="a">
											<li>
												<p>retain the following if it is supplied by the Licensor with the Licensed Material:</p>

												<ol type="i">
													<li>
														<p>
															identification of the creator(s) of the Licensed Material and any others designated to receive
															attribution, in any reasonable manner requested by the Licensor (including by pseudonym if
															designated);
														</p>
													</li>

													<li><p>ii. a copyright notice;</p></li>

													<li><p>a notice that refers to this Public License;</p></li>

													<li><p>a notice that refers to the disclaimer of warranties;</p></li>

													<li><p>a URI or hyperlink to the Licensed Material to the extent reasonably practicable;</p></li>
												</ol>
											</li>

											<li>
												<p>
													b. indicate if You modified the Licensed Material and retain an indication of any previous
													modifications; and
												</p>
											</li>

											<li>
												<p>
													c. indicate the Licensed Material is licensed under this Public License, and include the text of, or the
													URI or hyperlink to, this Public License.
												</p>
											</li>
										</ol>
									</li>

									<li>
										<p>
											2. You may satisfy the conditions in Section 3(a)(1) in any reasonable manner based on the medium, means,
											and context in which You Share the Licensed Material. For example, it may be reasonable to satisfy the
											conditions by providing a URI or hyperlink to a resource that includes the required information.
										</p>
									</li>

									<li>
										<p>
											3. If requested by the Licensor, You must remove any of the information required by Section 3(a)(1)(A) to
											the extent reasonably practicable.
										</p>
									</li>
								</ol>
							</li>

							<li>
								<p>ShareAlike.</p>

								<p>
									In addition to the conditions in Section 3(a), if You Share Adapted Material You produce, the following
									conditions also apply.
								</p>

								<ol>
									<li>
										<p>
											1. The Adapter's License You apply must be a Creative Commons license with the same License Elements, this
											version or later, or a BY-NC-SA Compatible License.
										</p>
									</li>

									<li>
										<p>
											2. You must include the text of, or the URI or hyperlink to, the Adapter's License You apply. You may
											satisfy this condition in any reasonable manner based on the medium, means, and context in which You Share
											Adapted Material.
										</p>
									</li>

									<li>
										<p>
											3. You may not offer or impose any additional or different terms or conditions on, or apply any Effective
											Technological Measures to, Adapted Material that restrict exercise of the rights granted under the Adapter's
											License You apply.
										</p>
									</li>
								</ol>
							</li>
						</ol>

						<h2>Section 4 - Sui Generis Database Rights.</h2>

						<p>Where the Licensed Rights include Sui Generis Database Rights that apply to Your use of the Licensed Material:</p>

						<ol type="a">
							<li>
								<p>
									for the avoidance of doubt, Section 2(a)(1) grants You the right to extract, reuse, reproduce, and Share all or
									a substantial portion of the contents of the database for NonCommercial purposes only;
								</p>
							</li>

							<li>
								<p>
									if You include all or a substantial portion of the database contents in a database in which You have Sui Generis
									Database Rights, then the database in which You have Sui Generis Database Rights (but not its individual
									contents) is Adapted Material, including for purposes of Section 3(b); and
								</p>
							</li>

							<li>
								<p>
									You must comply with the conditions in Section 3(a) if You Share all or a substantial portion of the contents of
									the database.
								</p>
							</li>
						</ol>

						<p>
							For the avoidance of doubt, this Section 4 supplements and does not replace Your obligations under this Public
							License where the Licensed Rights include other Copyright and Similar Rights.
						</p>

						<h2>Section 5 - Disclaimer of Warranties and Limitation of Liability.</h2>

						<ol type="a">
							<li>
								<p>
									a. UNLESS OTHERWISE SEPARATELY UNDERTAKEN BY THE LICENSOR, TO THE EXTENT POSSIBLE, THE LICENSOR OFFERS THE
									LICENSED MATERIAL AS-IS AND AS-AVAILABLE, AND MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND CONCERNING THE
									LICENSED MATERIAL, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHER. THIS INCLUDES, WITHOUT LIMITATION, WARRANTIES
									OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ABSENCE OF LATENT OR OTHER
									DEFECTS, ACCURACY, OR THE PRESENCE OR ABSENCE OF ERRORS, WHETHER OR NOT KNOWN OR DISCOVERABLE. WHERE DISCLAIMERS
									OF WARRANTIES ARE NOT ALLOWED IN FULL OR IN PART, THIS DISCLAIMER MAY NOT APPLY TO YOU.
								</p>
							</li>

							<li>
								<p>
									b. TO THE EXTENT POSSIBLE, IN NO EVENT WILL THE LICENSOR BE LIABLE TO YOU ON ANY LEGAL THEORY (INCLUDING,
									WITHOUT LIMITATION, NEGLIGENCE) OR OTHERWISE FOR ANY DIRECT, SPECIAL, INDIRECT, INCIDENTAL, CONSEQUENTIAL,
									PUNITIVE, EXEMPLARY, OR OTHER LOSSES, COSTS, EXPENSES, OR DAMAGES ARISING OUT OF THIS PUBLIC LICENSE OR USE OF
									THE LICENSED MATERIAL, EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSSES, COSTS, EXPENSES,
									OR DAMAGES. WHERE A LIMITATION OF LIABILITY IS NOT ALLOWED IN FULL OR IN PART, THIS LIMITATION MAY NOT APPLY TO
									YOU.
								</p>
							</li>

							<li>
								<p>
									c. The disclaimer of warranties and limitation of liability provided above shall be interpreted in a manner
									that, to the extent possible, most closely approximates an absolute disclaimer and waiver of all liability.
								</p>
							</li>
						</ol>

						<h2>Section 6 - Term and Termination.</h2>

						<ol type="a">
							<li>
								<p>
									This Public License applies for the term of the Copyright and Similar Rights licensed here. However, if You fail
									to comply with this Public License, then Your rights under this Public License terminate automatically.
								</p>
							</li>

							<li>
								<p>Where Your right to use the Licensed Material has terminated under Section 6(a), it reinstates:</p>

								<ol>
									<li>
										<p>
											1. automatically as of the date the violation is cured, provided it is cured within 30 days of Your
											discovery of the violation; or
										</p>
									</li>

									<li><p>2. upon express reinstatement by the Licensor.</p></li>
								</ol>

								<p>
									For the avoidance of doubt, this Section 6(b) does not affect any right the Licensor may have to seek remedies
									for Your violations of this Public License.
								</p>
							</li>

							<li>
								<p>
									For the avoidance of doubt, the Licensor may also offer the Licensed Material under separate terms or conditions
									or stop distributing the Licensed Material at any time; however, doing so will not terminate this Public
									License.
								</p>
							</li>

							<li><p>Sections 1, 5, 6, 7, and 8 survive termination of this Public License.</p></li>
						</ol>

						<h2>Section 7 - Other Terms and Conditions.</h2>

						<ol type="a">
							<li>
								<p>
									The Licensor shall not be bound by any additional or different terms or conditions communicated by You unless
									expressly agreed.
								</p>
							</li>

							<li>
								<p>
									Any arrangements, understandings, or agreements regarding the Licensed Material not stated herein are separate
									from and independent of the terms and conditions of this Public License.
								</p>
							</li>
						</ol>

						<h2>Section 8 - Interpretation.</h2>

						<ol type="a">
							<li>
								<p>
									For the avoidance of doubt, this Public License does not, and shall not be interpreted to, reduce, limit,
									restrict, or impose conditions on any use of the Licensed Material that could lawfully be made without
									permission under this Public License.
								</p>
							</li>

							<li>
								<p>
									To the extent possible, if any provision of this Public License is deemed unenforceable, it shall be
									automatically reformed to the minimum extent necessary to make it enforceable. If the provision cannot be
									reformed, it shall be severed from this Public License without affecting the enforceability of the remaining
									terms and conditions.
								</p>
							</li>

							<li>
								<p>
									No term or condition of this Public License will be waived and no failure to comply consented to unless
									expressly agreed to by the Licensor.
								</p>
							</li>

							<li>
								<p>
									Nothing in this Public License constitutes or may be interpreted as a limitation upon, or waiver of, any
									privileges and immunities that apply to the Licensor or You, including from the legal processes of any
									jurisdiction or authority.
								</p>
							</li>
						</ol>

						<hr />

						<p>
							Creative Commons is not a party to its public licenses. Notwithstanding, Creative Commons may elect to apply one of
							its public licenses to material it publishes and in those instances will be considered the “Licensor.” The text of
							the Creative Commons public licenses is dedicated to the public domain under the CC0 Public Domain Dedication.
							Except for the limited purpose of indicating that material is shared under a Creative Commons public license or as
							otherwise permitted by the Creative Commons policies published at creativecommons.org/policies, Creative Commons
							does not authorize the use of the trademark "Creative Commons" or any other trademark or logo of Creative Commons
							without its prior written consent including, without limitation, in connection with any unauthorized modifications
							to any of its public licenses or any other arrangements, understandings, or agreements concerning use of licensed
							material. For the avoidance of doubt, this paragraph does not form part of the public licenses.
						</p>

						<p>Creative Commons may be contacted at creativecommons.org.</p>
					</li>
				</ol>
			{/if}
		</div>
	</div>
</Popup>

<style>
	.tree {
		margin-left: auto;
		margin-right: auto;
		width: 50%;
	}

	.title {
		border-bottom: 1px solid #313244;
		padding-bottom: 1rem;
		display: flex;
		gap: 1rem;

		img {
			width: 1rem;
			height: 1rem;
		}
	}

	.nav-buttons {
		display: flex;
		margin-top: auto;
		flex-direction: row-reverse;

		button {
			border-radius: 0.25rem;
			width: 10rem;
			padding: 0.5rem;
			color: #181825;
			box-shadow: 0px 0px 0.25rem black;
			font-size: 0.85rem;
			transition: scale 0.1s;
			background-image: linear-gradient(to bottom right, #94e2d5, #a6e3a1);

			&:hover {
				scale: 105%;
			}
		}
	}

	ul {
		color: #a6adc8;
		font-size: 0.85rem;
	}

	li {
		margin-bottom: 0.5rem;
		margin-left: 2rem;
	}

	b {
		color: #cdd6f4;
		font-weight: normal;
	}

	i {
		color: #cdd6f4;
	}

	.popup {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 5fr;
		padding-right: 3rem;

		.content {
			h1:not(:first-child) {
				margin-top: 2rem;
			}

			padding: 1rem;
			flex-grow: 1;
			padding-left: 3rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			box-sizing: border-box;
			overflow-y: auto;

			p {
				color: #a6adc8;
				font-size: 0.85rem;
			}
		}

		h1 {
			font-weight: 700;
			text-transform: uppercase;
			font-size: 0.85rem;
			color: #cdd6f4;
		}

		h2 {
			font-weight: 700;
			text-transform: uppercase;
			font-size: 0.85rem;
			color: #a6adc8;
		}
		ul,
		li {
			color: #a6adc8;
		}

		.sidebar {
			height: 100%;
			width: 15rem;
			border-right: 1px solid #313244;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 1rem;

			h1:not(:first-child) {
				margin-top: 1rem;
			}

			button {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.25rem;
				padding-left: 0.5rem;
				width: 100%;
				border-radius: 0.25rem;
				--stroke: #cdd6f4;

				&:hover {
					background-color: #b4befe;
					--stroke: #181825;
				}

				span {
					color: var(--stroke);
				}
			}
		}
	}
</style>
